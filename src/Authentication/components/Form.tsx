import { useState } from "react";
import Email from "../../Email";
import Password from "../../Password";

type Props = {
  onSubmit: (email: Email, password: Password) => unknown;
};

const Form = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(email, password);
      }}
    >
      <input
        type="email"
        placeholder="fake@email.net"
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        type="password"
        placeholder="Passw0rd!"
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
