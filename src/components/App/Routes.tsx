import { Switch, Route } from "react-router-dom";
import UsersCreate from "../../pages/users/create";
import Home from "../../pages/index/index";
import Everything from "../../pages/everything";
import Today from "../../pages/today";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Routes = () => (
  <Switch>
    <PublicRoute path="/users/create">
      <UsersCreate />
    </PublicRoute>

    <PrivateRoute path="/everything">
      <Everything />
    </PrivateRoute>

    <PrivateRoute path="/today">
      <Today />
    </PrivateRoute>

    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
