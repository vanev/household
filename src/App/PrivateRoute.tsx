import { ComponentProps } from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../Authentication/hooks/useAuth";

const PrivateRoute = ({ children, ...rest }: ComponentProps<typeof Route>) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth._tag === "Authenticated" ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
