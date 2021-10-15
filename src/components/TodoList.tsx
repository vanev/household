import { QueryDocumentSnapshot } from "@firebase/firestore";
import classNames from "classnames";
import { sort } from "fp-ts/Array";
import { Ord as dateOrd } from "fp-ts/Date";
import { pipe } from "fp-ts/function";
import { values } from "fp-ts/Map";
import { Ord as stringOrd } from "fp-ts/string";
import { Option, isSome, getOrd, none } from "fp-ts/Option";
import { contramap } from "fp-ts/Ord";
import FirestoreObservable from "lib/Firebase/FirestoreObservable";
import useExpandable from "hooks/useExpandable";
import useTodos from "hooks/useTodos";
import Todo from "types/Todo";
import ExpandedTodo from "./ExpandedTodo";
import TodoItem from "./TodoItem";
import css from "./TodoList.module.css";

const snapshotId = (snapshot: QueryDocumentSnapshot<Todo>): string =>
  snapshot.id;

const ordId = contramap(snapshotId)(stringOrd);

const todoDate = (snapshot: QueryDocumentSnapshot<Todo>): Option<Date> => {
  const todo = snapshot.data();

  if (isSome(todo.completedAt)) return todo.completedAt;

  if (isSome(todo.when)) return todo.when;

  return todo.deadline;
};

const todoDateOrd = contramap(todoDate)(getOrd(dateOrd));

type ListProps = {
  observable: FirestoreObservable<Todo>;
  className?: string;
};

const List = ({ observable, className }: ListProps) => {
  const [isExpanded, expand, close] = useExpandable();
  const snapshots = pipe(
    useTodos(observable),
    values(ordId),
    sort(todoDateOrd),
  );

  return (
    <div className={classNames(css.root, className)}>
      {snapshots.map((snapshot) => (
        <TodoItem
          key={snapshot.id}
          className={css.item}
          snapshot={snapshot}
          onSave={close}
          onExpandClick={() => expand(snapshot.id)}
          isExpanded={isExpanded(snapshot.id)}
        />
      ))}

      {isExpanded("new todo") ? (
        <ExpandedTodo className={css.item} snapshot={none} onSave={close} />
      ) : (
        <button className={css.addButton} onClick={() => expand("new todo")}>
          Add Todo
        </button>
      )}
    </div>
  );
};

export default List;
