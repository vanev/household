import classNames from "classnames";
import { Failed, Unauthenticated } from "../../Authentication";
import useForm from "../../hooks/useForm";
import Email from "../../Email";
import Password from "../../Password";
import css from "./AuthForm.module.css";

type IncompleteValues = {
  email: string;
  password: string;
};

type CompleteValues = {
  email: Email;
  password: Password;
};

const initialValues: IncompleteValues = {
  email: "",
  password: "",
};

const validator = (values: IncompleteValues): values is CompleteValues =>
  !!values.email && !!values.password;

type Props = {
  auth: Unauthenticated | Failed;
  className?: string;
};

const AuthForm = ({ auth, className }: Props) => {
  const handleSubmit = (values: CompleteValues) => {
    return auth.authenticate(values.email, values.password);
  };

  const state = useForm(initialValues, validator, handleSubmit);

  switch (state._tag) {
    case "Success":
      return (
        <p className={classNames(css.root, className)}>
          <strong>{state.result.user.email}</strong> Authenticated!
        </p>
      );

    case "Incomplete":
    case "Complete":
    case "Submitting":
    case "Failure":
      return (
        <form
          className={classNames(css.root, className)}
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            className={css.input}
            type="email"
            placeholder="example@email.net"
            disabled={state._tag === "Submitting"}
            value={state.values.email}
            onChange={(event) => {
              if (state._tag !== "Submitting") {
                state.change("email")(event.target.value);
              }
            }}
          />

          <input
            className={css.input}
            type="password"
            placeholder="Passw0rd!"
            disabled={state._tag === "Submitting"}
            value={state.values.password}
            onChange={(event) => {
              if (state._tag !== "Submitting") {
                state.change("password")(event.target.value);
              }
            }}
          />

          {state._tag === "Failure" ? (
            <p className={css.error}>{state.error.message}</p>
          ) : null}

          <button
            className={css.button}
            type="button"
            disabled={
              state._tag === "Incomplete" || state._tag === "Submitting"
            }
            onClick={() => {
              if (state._tag === "Complete") state.submit();
            }}
          >
            Submit
          </button>
        </form>
      );
  }
};

export default AuthForm;
