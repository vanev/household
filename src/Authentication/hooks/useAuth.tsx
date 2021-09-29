import * as FirebaseAuth from "firebase/auth";
import * as React from "react";
import auth from "../../Firebase/auth";
import * as Auth from "../types/Authentication";

const Context = React.createContext<Auth.Authentication>(Auth.loading);

type Props = {
  children: React.ReactNode;
};

type Loading = {
  _tag: "Loading";
};
const loading: Loading = {
  _tag: "Loading",
};

type Authenticated = {
  _tag: "Authenticated";
  user: FirebaseAuth.User;
};
const authenticated = (user: FirebaseAuth.User): Authenticated => ({
  _tag: "Authenticated",
  user,
});

type Unauthenticated = {
  _tag: "Unauthenticated";
};
const unauthenticated: Unauthenticated = {
  _tag: "Unauthenticated",
};

type Failed = {
  _tag: "Failed";
  error: Error;
};
const failed = (error: Error): Failed => ({
  _tag: "Failed",
  error,
});

type State = Loading | Authenticated | Unauthenticated | Failed;

export const Provider = ({ children }: Props) => {
  const [state, setState] = React.useState<State>(loading);

  React.useEffect(() => {
    const handleChange = (user: FirebaseAuth.User | null) => {
      setState(user ? authenticated(user) : unauthenticated);
    };

    const handleError = (error: Error) => {
      setState(failed(error));
    };

    FirebaseAuth.onAuthStateChanged(auth, handleChange, handleError);
  }, []);

  const authenticate = React.useCallback((email, password) => {
    FirebaseAuth.signInWithEmailAndPassword(auth, email, password).catch(
      (reason) => {
        setState(failed(reason));
      },
    );
  }, []);

  const unauthenticate = React.useCallback(() => {
    FirebaseAuth.signOut(auth);
  }, []);

  let authentication: Auth.Authentication;
  switch (state._tag) {
    case "Loading":
      authentication = Auth.loading;
      break;

    case "Failed":
      authentication = Auth.failed(authenticate)(state.error);
      break;

    case "Unauthenticated":
      authentication = Auth.unauthenticated(authenticate);
      break;

    case "Authenticated":
      authentication = Auth.authenticated(unauthenticate)(state.user);
      break;
  }

  return <Context.Provider value={authentication}>{children}</Context.Provider>;
};

const useAuth = (): Auth.Authentication => React.useContext(Context);

export default useAuth;
