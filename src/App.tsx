import { Provider as AuthProvider } from "./Authentication/hooks/useAuth";
import Authentication from "./Authentication/components/Authentication";
import UserCreation from "./User/componets/Creation";
import styles from "./App.module.css";

const App = () => (
  <AuthProvider>
    <div className={styles.App}>
      <Authentication />
      <UserCreation />
    </div>
  </AuthProvider>
);

export default App;
