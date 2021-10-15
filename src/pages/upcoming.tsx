import { query, where, onSnapshot } from "@firebase/firestore";
import { merge } from "lib/Observable";
import FirestoreObservable from "lib/Firebase/FirestoreObservable";
import Todo from "types/Todo";
import Page from "components/Page";
import List from "components/GroupedTodoList";
import collection from "queries/Todos/collection";

const dueQuery = query(
  collection,
  where("deadline._tag", "==", "Some"),
  where("completedAt._tag", "==", "None"),
);

const scheduledQuery = query(
  collection,
  where("when._tag", "==", "Some"),
  where("completedAt._tag", "==", "None"),
);

const observable: FirestoreObservable<Todo> = merge([
  (observer) => onSnapshot(dueQuery, observer),
  (observer) => onSnapshot(scheduledQuery, observer),
]);

const Upcoming = () => (
  <Page title="Upcoming" parentUrl="/">
    <List observable={observable} />
  </Page>
);

export default Upcoming;
