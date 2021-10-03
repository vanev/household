export type Loading = {
  _tag: "Loading";
};
export const loading: Loading = {
  _tag: "Loading",
};

export type Completed<R> = {
  _tag: "Completed";
  response: R;
};
export const completed = <R>(response: R): Completed<R> => ({
  _tag: "Completed",
  response,
});

export type Failed<E> = {
  _tag: "Failed";
  reason: E;
};
export const failed = <E>(reason: E): Failed<E> => ({
  _tag: "Failed",
  reason,
});

export type Request<E, R> = Loading | Completed<R> | Failed<E>;

export const extract =
  <E, A, B>(
    handleLoading: () => B,
    handleCompleted: (result: A) => B,
    handleFailed: (reason: E) => B,
  ) =>
  (request: Request<E, A>): B => {
    switch (request._tag) {
      case "Loading":
        return handleLoading();

      case "Completed":
        return handleCompleted(request.response);

      case "Failed":
        return handleFailed(request.reason);
    }
  };
