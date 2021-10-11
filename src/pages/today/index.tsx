import { query, where, onSnapshot } from "@firebase/firestore";
import { startOfDay, endOfDay } from "date-fns/fp";
import { merge } from "../../Observable";
import FirestoreObservable from "../../lib/Firebase/FirestoreObservable";
import Todo from "../../Todo";
import List from "../../components/TodoList";
import collection from "../../queries/Todos/collection";
import css from "./styles.module.css";

const now = new Date();
const todayStart = startOfDay(now);
const todayEnd = endOfDay(now);

const dueTodayQuery = query(
  collection,
  where("deadline.value", "<=", todayEnd),
  where("completedAt._tag", "==", "None"),
);

const scheduledTodayQuery = query(
  collection,
  where("when.value", "<=", todayEnd),
  where("completedAt._tag", "==", "None"),
);

const completedTodayQuery = query(
  collection,
  where("completedAt.value", "<=", todayEnd),
  where("completedAt.value", ">=", todayStart),
);

const observable: FirestoreObservable<Todo> = merge([
  (observer) => onSnapshot(dueTodayQuery, observer),
  (observer) => onSnapshot(scheduledTodayQuery, observer),
  (observer) => onSnapshot(completedTodayQuery, observer),
]);

const Today = () => (
  <div className={css.root}>
    <h1 className={css.title}>Today</h1>
    <List observable={observable} className={css.list} />
  </div>
);

export default Today;
