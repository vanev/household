import { onSnapshot } from "@firebase/firestore";
import FirestoreObservable from "../../Firebase/FirestoreObservable";
import Todo from "../../Todo/types/Todo";
import List from "../../components/TodoList";
import todosCollection from "../../queries/Todos/collection";
import css from "./styles.module.css";

const observable: FirestoreObservable<Todo> = (observer) =>
  onSnapshot(todosCollection, observer);

const Everything = () => {
  return (
    <div className={css.root}>
      <h1 className={css.title}>All Todos</h1>
      <List observable={observable} className={css.list} />
    </div>
  );
};

export default Everything;
