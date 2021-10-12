import { query, where, onSnapshot } from "@firebase/firestore";
import { startOfDay, endOfDay } from "date-fns/fp";
import { merge } from "lib/Observable";
import FirestoreObservable from "lib/Firebase/FirestoreObservable";
import Todo from "types/Todo";
import Page from "components/Page";
import List from "components/TodoList";
import collection from "queries/Todos/collection";

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
  <Page title="Today" parentUrl="/">
    <List observable={observable} />
  </Page>
);

export default Today;
