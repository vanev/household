import { BrowserRouter as Router } from "react-router-dom";
import { Provider as AuthProvider } from "../Authentication/hooks/useAuth";
import Authentication from "../Authentication/components/Authentication";
import Routes from "./Routes";
import css from "./styles.module.css";

const App = () => (
  <AuthProvider>
    <Router>
      <div className={css.root}>
        <Authentication />

        <Routes />
      </div>
    </Router>
  </AuthProvider>
);

export default App;
