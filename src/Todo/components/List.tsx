import { QueryDocumentSnapshot } from "@firebase/firestore";
import classNames from "classnames";
import { Option, some, none, reduce } from "fp-ts/Option";
import { useEffect, useState } from "react";
import FirestoreObservable from "../../Firebase/FirestoreObservable";
import Todo from "../types/Todo";
import ClosedTodo from "./ClosedTodo";
import ExpandedTodo from "./ExpandedTodo";
import css from "./List.module.css";

type ListProps = {
  observable: FirestoreObservable<Todo>;
  className?: string;
};

const List = ({ observable, className }: ListProps) => {
  const [expandedId, setExpandedId] = useState<Option<string>>(none);
  const [snapshots, setSnapshots] = useState<
    Array<QueryDocumentSnapshot<Todo>>
  >([]);

  useEffect(() => {
    return observable({
      next: ({ docs }) => setSnapshots(docs),
    });
  }, [observable]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedId(none);
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  });

  const isExpanded = (snapshotId: string): boolean =>
    reduce(false, (_, id) => snapshotId === id)(expandedId);

  return (
    <div className={classNames(css.root, className)}>
      {snapshots.map((snapshot) => {
        return isExpanded(snapshot.id) ? (
          <ExpandedTodo
            key={snapshot.id}
            className={css.item}
            snapshot={some(snapshot)}
            onSave={() => setExpandedId(none)}
          />
        ) : (
          <ClosedTodo
            key={snapshot.id}
            className={css.item}
            snapshot={snapshot}
            onExpandClick={() => {
              setExpandedId(some(snapshot.id));
            }}
          />
        );
      })}

      {isExpanded("new todo") ? (
        <ExpandedTodo
          className={css.item}
          snapshot={none}
          onSave={() => setExpandedId(none)}
        />
      ) : (
        <button
          className={css.addButton}
          onClick={() => {
            setExpandedId(some("new todo"));
          }}
        >
          Add Todo
        </button>
      )}
    </div>
  );
};

export default List;
