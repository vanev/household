import { User } from "firebase/auth";
import Authenticator from "./Authenticator";
import Unauthenticator from "./Unauthenticator";

export type Loading = {
  _tag: "Loading";
};
export const loading: Loading = {
  _tag: "Loading",
};

export type Unauthenticated = {
  _tag: "Unauthenticated";
  authenticate: Authenticator;
};
export const unauthenticated = (
  authenticate: Authenticator,
): Unauthenticated => ({
  _tag: "Unauthenticated",
  authenticate,
});

export type Authenticated = {
  _tag: "Authenticated";
  user: User;
  unauthenticate: Unauthenticator;
};
export const authenticated =
  (unauthenticate: Unauthenticator) =>
  (user: User): Authenticated => ({
    _tag: "Authenticated",
    user,
    unauthenticate,
  });

export type Failed = {
  _tag: "Failed";
  error: Error;
  authenticate: Authenticator;
};
export const failed =
  (authenticate: Authenticator) =>
  (error: Error): Failed => ({
    _tag: "Failed",
    error,
    authenticate,
  });

export type Authentication = Loading | Unauthenticated | Authenticated | Failed;
