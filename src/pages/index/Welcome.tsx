import { Link } from "react-router-dom";
import { Unauthenticated, Failed } from "types/Authentication";
import Page from "components/Page";
import AuthForm from "./AuthForm";
import css from "./Welcome.module.css";

type Props = {
  auth: Unauthenticated | Failed;
};

const Welcome = ({ auth }: Props) => (
  <Page title="Sign In" mainClassName={css.main}>
    <AuthForm className={css.authForm} auth={auth} />

    <Link className={css.link} to="/users/create">
      Create Account
    </Link>
  </Page>
);

export default Welcome;
