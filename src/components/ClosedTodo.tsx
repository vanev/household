import { QueryDocumentSnapshot, setDoc } from "@firebase/firestore";
import classNames from "classnames";
import { isSameDay, isBefore, addDays, format } from "date-fns/fp";
import { flow } from "fp-ts/function";
import { some, none, map, getOrElse, isSome } from "fp-ts/Option";
import { MouseEventHandler, useMemo } from "react";
import { Todo, isComplete, startAt, dueAt } from "types/Todo";
import css from "./ClosedTodo.module.css";

const toggleCompleted = (todo: Todo): Todo => ({
  ...todo,
  completedAt: isComplete(todo) ? none : some(new Date()),
});

const isToday: (todo: Todo) => boolean = flow(
  startAt,
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

  const todoStartAt = startAt(todo);
  const todoDueAt = dueAt(todo);

  return (
    <div
      className={classNames(css.root, className, {
        [css.completed]: isComplete(todo),
      })}
    >
      <input
        className={css.checkbox}
        type="checkbox"
        onChange={() => setDoc(snapshot.ref, toggleCompleted(todo))}
        checked={isComplete(todo)}
      />

      <button className={css.title} onClick={onExpandClick}>
        <span className={css.label}>
          {isSome(todoStartAt) ? (
            <span className={css.date}>
              {format("M/dd")(todoStartAt.value)}
            </span>
          ) : null}
          {todo.title}
        </span>

        <span className={css.icons}>
          {isToday(todo) ? <span className={css.icon}>☀️</span> : null}

          {isSome(todoDueAt) ? (
            <>
              <span className={css.icon}>
                {!isComplete(todo) &&
                isBefore(addDays(2)(new Date()))(todoDueAt.value)
                  ? "❗️"
                  : "❕️"}
              </span>

              <span className={css.date}>
                {format("M/dd", todoDueAt.value)}
              </span>
            </>
          ) : null}
        </span>
      </button>
    </div>
  );
};

export default ClosedTodo;
