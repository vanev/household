import { DocumentChange, QueryDocumentSnapshot } from "@firebase/firestore";
import classNames from "classnames";
import { reduce as reduceArray } from "fp-ts/Array";
import { deleteAt, toArray, upsertAt } from "fp-ts/Map";
import { Ord as stringOrd, Eq as stringEq } from "fp-ts/string";
import { some, none } from "fp-ts/Option";
import { useEffect, useState } from "react";
import FirestoreObservable from "lib/Firebase/FirestoreObservable";
import useExpandable from "hooks/useExpandable";
import Todo from "types/Todo";
import ClosedTodo from "./ClosedTodo";
import ExpandedTodo from "./ExpandedTodo";
import css from "./TodoList.module.css";

const applyChange = (
  memo: Map<string, QueryDocumentSnapshot<Todo>>,
  { type, doc }: DocumentChange<Todo>,
) => {
  switch (type) {
    case "added":
    case "modified":
      return upsertAt(stringEq)(doc.id, doc)(memo);

    case "removed":
      return deleteAt(stringEq)(doc.id)(memo);
  }
};

type ListProps = {
  observable: FirestoreObservable<Todo>;
  className?: string;
};

const List = ({ observable, className }: ListProps) => {
  const [isExpanded, expand, close] = useExpandable();
  const [snapshots, setSnapshots] = useState<
    Map<string, QueryDocumentSnapshot<Todo>>
  >(new Map());

  useEffect(() => {
    return observable({
      next: (snapshot) => {
        const changes = snapshot.docChanges();

        setSnapshots((snapshots) =>
          reduceArray(snapshots, applyChange)(changes),
        );
      },
    });
  }, [observable]);

  return (
    <div className={classNames(css.root, className)}>
      {toArray(stringOrd)(snapshots).map(([_, snapshot]) => {
        return isExpanded(snapshot.id) ? (
          <ExpandedTodo
            key={snapshot.id}
            className={css.item}
            snapshot={some(snapshot)}
            onSave={close}
          />
        ) : (
          <ClosedTodo
            key={snapshot.id}
            className={css.item}
            snapshot={snapshot}
            onExpandClick={() => expand(snapshot.id)}
          />
        );
      })}

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
