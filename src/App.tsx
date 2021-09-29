import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider as AuthProvider } from "./Authentication/hooks/useAuth";
import Authentication from "./Authentication/components/Authentication";
import UserCreation from "./User/componets/Creation";
import Home from "./Home";
import styles from "./App.module.css";

const App = () => (
  <AuthProvider>
    <Router>
      <div className={styles.App}>
        <Authentication />

        <Switch>
          <Route path="/users/create">
            <UserCreation />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
