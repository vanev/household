import Email from "../../Email";
import Password from "../../Password";

type Authenticator = (email: Email, password: Password) => unknown;

export default Authenticator;
