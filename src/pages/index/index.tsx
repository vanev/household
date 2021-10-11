import useAuth from "../../hooks/useAuth";
import Loading from "./Loading";
import Welcome from "./Welcome";
import Menu from "./Menu";

const Home = () => {
  const auth = useAuth();

  switch (auth._tag) {
    case "Loading":
      return <Loading />;

    case "Failed":
    case "Unauthenticated":
      return <Welcome auth={auth} />;

    case "Authenticated":
      return <Menu auth={auth} />;
  }
};

export default Home;
