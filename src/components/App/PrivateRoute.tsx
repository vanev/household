import { ComponentProps } from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "hooks/useAuth";
import LoadingPage from "../LoadingPage";

const PrivateRoute = ({ children, ...rest }: ComponentProps<typeof Route>) => {
  const auth = useAuth();

  if (auth._tag === "Loading") return <LoadingPage />;

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
