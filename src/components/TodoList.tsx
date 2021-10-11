import classNames from "classnames";
import { toArray } from "fp-ts/Map";
import { Ord as stringOrd } from "fp-ts/string";
import { none } from "fp-ts/Option";
import FirestoreObservable from "lib/Firebase/FirestoreObservable";
import useExpandable from "hooks/useExpandable";
import useTodos from "hooks/useTodos";
import Todo from "types/Todo";
import ExpandedTodo from "./ExpandedTodo";
import TodoItem from "./TodoItem";
import css from "./TodoList.module.css";

type ListProps = {
  observable: FirestoreObservable<Todo>;
  className?: string;
};

const List = ({ observable, className }: ListProps) => {
  const [isExpanded, expand, close] = useExpandable();
  const snapshots = useTodos(observable);

  return (
    <div className={classNames(css.root, className)}>
      {toArray(stringOrd)(snapshots).map(([_, snapshot]) => (
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
