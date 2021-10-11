import { UserCredential } from "@firebase/auth";
import { TaskEither } from "fp-ts/TaskEither";
import Email from "../Email";
import Password from "../Password";

type Authenticator = (
  email: Email,
  password: Password,
) => TaskEither<Error, UserCredential>;

export default Authenticator;
