import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import useAuth from "../../Authentication/hooks/useAuth";
import Email from "../../Email";
import firebaseAuth from "../../Firebase/auth";
import Password from "../../Password";

type Props = {
  onSubmit: (email: Email, password: Password) => unknown;
};

const Form = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

const Creation = () => {
  const auth = useAuth();

  switch (auth._tag) {
    case "Loading":
      return <p>Loading...</p>;

    case "Authenticated":
      return <p>Sign out to create a new account.</p>;

    case "Failed":
    case "Unauthenticated":
      return (
        <div>
          <Form
            onSubmit={(email, password) => {
              createUserWithEmailAndPassword(firebaseAuth, email, password);
            }}
          />
        </div>
      );
  }
};

export default Creation;
