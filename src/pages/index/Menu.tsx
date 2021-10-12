import { Link } from "react-router-dom";
import { Authenticated } from "types/Authentication";
import Page from "components/Page";
import css from "./Menu.module.css";

type Props = {
  auth: Authenticated;
};

const Menu = ({ auth }: Props) => (
  <Page title="Menu">
    <Link className={css.link} to="/today">
      Today
    </Link>

    <Link className={css.link} to="/everything">
      Everything
    </Link>

    <button className={css.link} onClick={auth.unauthenticate()}>
      Sign Out
    </button>
  </Page>
);

export default Menu;
