import useAuth from "hooks/useAuth";
import Page from "components/Page";
import Form from "./Form";

const UsersCreate = () => {
  const auth = useAuth();

  switch (auth._tag) {
    case "Loading":
      return (
        <Page title="Create Account" parentUrl="/">
          Loading...
        </Page>
      );

    case "Authenticated":
      return (
        <Page title="Create Account" parentUrl="/">
          <button onClick={auth.unauthenticate}>Sign out</button> to create a
          new account.
        </Page>
      );

    case "Failed":
    case "Unauthenticated":
      return (
        <Page title="Create Account" parentUrl="/">
          <Form />
        </Page>
      );
  }
};

export default UsersCreate;
