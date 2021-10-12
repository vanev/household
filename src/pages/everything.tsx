import { onSnapshot } from "@firebase/firestore";
import FirestoreObservable from "lib/Firebase/FirestoreObservable";
import Todo from "types/Todo";
import Page from "components/Page";
import List from "components/TodoList";
import todosCollection from "queries/Todos/collection";

const observable: FirestoreObservable<Todo> = (observer) =>
  onSnapshot(todosCollection, observer);

const Everything = () => (
  <Page title="Everything" parentUrl="/">
    <List observable={observable} />
  </Page>
);

export default Everything;
