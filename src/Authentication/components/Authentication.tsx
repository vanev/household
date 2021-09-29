import useAuth from "../hooks/useAuth";
import Form from "./Form";

const Authentication = () => {
  const auth = useAuth();

  switch (auth._tag) {
    case "Loading":
      return <p>Loading...</p>;

    case "Authenticated":
      return <button onClick={auth.unauthenticate}>Sign Out</button>;

    case "Failed":
      return (
        <div>
          <p>{auth.error.message}</p>
          <Form onSubmit={auth.authenticate} />
        </div>
      );

    case "Unauthenticated":
      return <Form onSubmit={auth.authenticate} />;
  }
};

export default Authentication;
