import List from "./Todo/components/List";
import todosCollection from "./Todo/queries/collection";
import css from "./Home.module.css";

const Home = () => (
  <div className={css.root}>
    <h1 className={css.title}>All Todos</h1>
    <List query={todosCollection} className={css.list} />
  </div>
);

export default Home;
