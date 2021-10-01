import List from "../../Todo/components/List";
import todosCollection from "../../Todo/queries/collection";
import css from "./styles.module.css";

const Everything = () => (
  <div className={css.root}>
    <h1 className={css.title}>All Todos</h1>
    <List query={todosCollection} className={css.list} />
  </div>
);

export default Everything;
