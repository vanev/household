import { UserCredential } from "@firebase/auth";
import { TaskEither } from "fp-ts/TaskEither";
import Email from "../lib/Email";
import Password from "../lib/Password";

type Authenticator = (
  email: Email,
  password: Password,
) => TaskEither<Error, UserCredential>;

export default Authenticator;
