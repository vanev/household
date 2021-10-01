import { Switch, Route } from "react-router-dom";
import UsersCreate from "../pages/users/create";
import Home from "../pages/index";
import Everything from "../pages/everything";

const Routes = () => (
  <Switch>
    <Route path="/users/create">
      <UsersCreate />
    </Route>

    <Route path="/everything">
      <Everything />
    </Route>

    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
