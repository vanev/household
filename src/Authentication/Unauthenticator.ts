import { TaskEither } from "fp-ts/TaskEither";

type Unauthenticator = () => TaskEither<Error, void>;

export default Unauthenticator;
