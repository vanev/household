import { QueryDocumentSnapshot } from "@firebase/firestore";
import classNames from "classnames";
import { map } from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { values } from "fp-ts/Map";
import { NonEmptyArray, groupBy } from "fp-ts/lib/NonEmptyArray";
import { contramap } from "fp-ts/Ord";
import { toArray as recordToArray } from "fp-ts/Record";
import { Ord as stringOrd } from "fp-ts/string";
import FirestoreObservable from "lib/Firebase/FirestoreObservable";
import useExpandable from "hooks/useExpandable";
import useTodos from "hooks/useTodos";
import Todo from "types/Todo";
import TodoItem from "../TodoItem";
import todoDateString from "./todoDateString";
import css from "./styles.module.css";

const ordId = contramap<string, QueryDocumentSnapshot<Todo>>(
  (snapshot) => snapshot.id,
)(stringOrd);

type Props = {
  observable: FirestoreObservable<Todo>;
  className?: string;
};

const GroupedTodoList = ({ observable, className }: Props) => {
  const [isExpanded, expand, close] = useExpandable();
  const groupedSnapshots = pipe(
    useTodos(observable),
    values(ordId),
    groupBy(todoDateString),
    recordToArray,
  );

  return (
    <div className={classNames(css.root, className)}>
      {map(
        ([groupName, groupSnapshots]: [
          string,
          NonEmptyArray<QueryDocumentSnapshot<Todo>>,
        ]) => (
          <div className={css.group} key={groupName}>
            <p className={css.groupName}>{groupName}</p>

            {map((snapshot: QueryDocumentSnapshot<Todo>) => (
              <TodoItem
                key={snapshot.id}
                className={css.item}
                snapshot={snapshot}
                onSave={close}
                onExpandClick={() => expand(snapshot.id)}
                isExpanded={isExpanded(snapshot.id)}
              />
            ))(groupSnapshots)}
          </div>
        ),
      )(groupedSnapshots)}
    </div>
  );
};

export default GroupedTodoList;
