import { Switch, Route } from "react-router-dom";
import UsersCreate from "../pages/users/create";
import Home from "../pages/index";

const Routes = () => (
  <Switch>
    <Route path="/users/create">
      <UsersCreate />
    </Route>

    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
