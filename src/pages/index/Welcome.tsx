import { Link } from "react-router-dom";
import { Unauthenticated, Failed } from "types/Authentication";
import AuthForm from "./AuthForm";
import css from "./Welcome.module.css";

type Props = {
  auth: Unauthenticated | Failed;
};

const Welcome = ({ auth }: Props) => (
  <div className={css.root}>
    <h1 className={css.title}>Household</h1>

    <AuthForm className={css.authForm} auth={auth} />

    <Link className={css.link} to="/users/create">
      Create Account
    </Link>
  </div>
);

export default Welcome;
