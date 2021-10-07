import { QueryDocumentSnapshot, setDoc } from "@firebase/firestore";
import classNames from "classnames";
import { isSameDay } from "date-fns/fp";
import { flow } from "fp-ts/function";
import { some, none, map, getOrElse } from "fp-ts/Option";
import { MouseEventHandler, useMemo } from "react";
import { Todo, isComplete } from "../types/Todo";
import css from "./ClosedTodo.module.css";

const toggleCompleted = (todo: Todo): Todo => ({
  ...todo,
  completedAt: isComplete(todo) ? none : some(new Date()),
});

const isToday: (todo: Todo) => boolean = flow(
  (todo: Todo) => todo.when,
  map(isSameDay(new Date())),
  getOrElse((): boolean => false),
);

type Props = {
  snapshot: QueryDocumentSnapshot<Todo>;
  onExpandClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const ClosedTodo = ({ snapshot, onExpandClick, className }: Props) => {
  const todo = useMemo(() => snapshot.data(), [snapshot]);

  return (
    <div className={classNames(css.root, className)}>
      <input
        className={css.checkbox}
        type="checkbox"
        onChange={() => setDoc(snapshot.ref, toggleCompleted(todo))}
        checked={isComplete(todo)}
      />

      <button className={css.title} onClick={onExpandClick}>
        <span className={css.label}>{todo.title}</span>

        <span className={css.icons}>
          {isToday(todo) ? <span className={css.icon}>☀️</span> : null}
        </span>
      </button>
    </div>
  );
};

export default ClosedTodo;
