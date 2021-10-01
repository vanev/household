import { Link } from "react-router-dom";
import { Authenticated } from "../../Authentication/types/Authentication";
import css from "./Menu.module.css";

type Props = {
  auth: Authenticated;
};

const Menu = ({ auth }: Props) => (
  <div className={css.root}>
    <h1 className={css.title}>Household</h1>

    <Link className={css.link} to="/everything">
      Everything
    </Link>

    <button className={css.link} onClick={auth.unauthenticate}>
      Sign Out
    </button>
  </div>
);

export default Menu;
