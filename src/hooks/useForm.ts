import * as TaskEither from "fp-ts/TaskEither";
import * as Task from "fp-ts/Task";
import { flow } from "fp-ts/function";
import { useState, useCallback } from "react";
import { Request, loading, completed, failed, extract } from "../Request";

type Incomplete<V> = {
  _tag: "Incomplete";
  values: V;
  change: <K extends keyof V>(key: K) => (value: V[K]) => unknown;
  reset: () => unknown;
};
const incomplete =
  <V>(reset: () => unknown) =>
  (change: <K extends keyof V>(key: K) => (value: V[K]) => unknown) =>
  (values: V): Incomplete<V> => ({
    _tag: "Incomplete",
    values,
    change,
    reset,
  });

type Complete<IV, CV extends IV> = {
  _tag: "Complete";
  values: CV;
  change: <K extends keyof IV>(key: K) => (value: IV[K]) => unknown;
  reset: () => unknown;
  submit: () => unknown;
};
const complete =
  <IV, CV extends IV>(reset: () => unknown) =>
  (submit: () => unknown) =>
  (change: <K extends keyof IV>(key: K) => (value: IV[K]) => unknown) =>
  (values: CV): Complete<IV, CV> => ({
    _tag: "Complete",
    values,
    change,
    reset,
    submit,
  });

type Submitting<V> = {
  _tag: "Submitting";
  values: V;
};
const submitting = <V>(values: V): Submitting<V> => ({
  _tag: "Submitting",
  values,
});

type Success<V, R> = {
  _tag: "Success";
  values: V;
  result: R;
  reset: () => unknown;
};
const success =
  <V, R>(reset: () => unknown) =>
  (values: V) =>
  (result: R): Success<V, R> => ({
    _tag: "Success",
    values,
    reset,
    result,
  });

type Failure<IV, CV extends IV, E> = {
  _tag: "Failure";
  values: CV;
  error: E;
  change: <K extends keyof IV>(key: K) => (value: IV[K]) => unknown;
  reset: () => unknown;
};
export const failure =
  <IV, CV extends IV, E>(reset: () => unknown) =>
  (change: <K extends keyof IV>(key: K) => (value: IV[K]) => unknown) =>
  (values: CV) =>
  (error: E): Failure<IV, CV, E> => ({
    _tag: "Failure",
    values,
    change,
    reset,
    error,
  });

type State<IV, CV extends IV, R = unknown, E = unknown> =
  | Incomplete<IV>
  | Complete<IV, CV>
  | Submitting<CV>
  | Success<CV, R>
  | Failure<IV, CV, E>;

const useForm = <IV, CV extends IV, R = unknown, E = unknown>(
  initialValues: IV,
  validator: (values: IV) => values is CV,
  onSubmit: (values: CV) => TaskEither.TaskEither<E, R>,
): State<IV, CV, R, E> => {
  const [values, setValues] = useState<IV>(initialValues);

  const [submitRequest, setSubmitRequest] = useState<Request<E, R> | null>(
    null,
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setSubmitRequest(null);
  }, [initialValues]);

  const change = useCallback(
    <K extends keyof IV>(key: K) =>
      (value: IV[K]) => {
        setSubmitRequest(null);
        setValues((values) => ({ ...values, [key]: value }));
      },
    [],
  );

  if (!validator(values)) {
    if (submitRequest) throw new Error("Impossible State");

    return incomplete<IV>(reset)(change)(values);
  }

  if (submitRequest) {
    return extract<E, R, State<IV, CV, R, E>>(
      () => submitting<CV>(values),
      success<CV, R>(reset)(values),
      failure<IV, CV, E>(reset)(change)(values),
    )(submitRequest);
  }

  const submit = () => {
    setSubmitRequest(loading);

    const submitTask = flow(
      onSubmit,
      TaskEither.bimap(failed, completed),
      TaskEither.toUnion,
      Task.map(setSubmitRequest),
    )(values);

    submitTask();
  };

  return complete<IV, CV>(reset)(submit)(change)(values);
};

export default useForm;
