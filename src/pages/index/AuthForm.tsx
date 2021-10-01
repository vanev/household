import classNames from "classnames";
import { useState } from "react";
import {
  Failed,
  Unauthenticated,
} from "../../Authentication/types/Authentication";
import css from "./AuthForm.module.css";

type Props = {
  auth: Unauthenticated | Failed;
  className?: string;
};

const AuthForm = ({ auth, className }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form
      className={classNames(css.root, className)}
      onSubmit={(event) => {
        event.preventDefault();
        auth.authenticate(email, password);
      }}
    >
      <input
        className={css.input}
        type="email"
        placeholder="example@email.net"
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        className={css.input}
        type="password"
        placeholder="Passw0rd!"
        onChange={(event) => setPassword(event.target.value)}
      />

      {auth._tag === "Failed" ? (
        <p className={css.error}>{auth.error.message}</p>
      ) : null}

      <button className={css.button} type="submit">
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
