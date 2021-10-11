import useAuth from "../../../hooks/useAuth";
import Form from "./Form";
import css from "./Create.module.css";

const UsersCreate = () => {
  const auth = useAuth();

  switch (auth._tag) {
    case "Loading":
      return (
        <div className={css.root}>
          <p className={css.title}>Loading...</p>
        </div>
      );

    case "Authenticated":
      return (
        <div className={css.root}>
          <p className={css.title}>
            <button className={css.button} onClick={auth.unauthenticate}>
              Sign out
            </button>{" "}
            to create a new account.
          </p>
        </div>
      );

    case "Failed":
    case "Unauthenticated":
      return (
        <div className={css.root}>
          <h1 className={css.title}>Create Account</h1>

          <Form className={css.form} />
        </div>
      );
  }
};

export default UsersCreate;
