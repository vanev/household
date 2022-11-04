import {
  doc,
  DocumentReference,
  QueryDocumentSnapshot,
  setDoc,
} from "@firebase/firestore";
import classNames from "classnames";
import { format } from "date-fns/fp";
import { flow } from "fp-ts/function";
import { Option, fromEither, none, reduce, map, getOrElse } from "fp-ts/Option";
import { useState } from "react";
import { fromDateInputValue } from "lib/Date";
import { isNonEmptyString } from "lib/String";
import Todo from "types/Todo";
import todosCollection from "queries/Todos/collection";
import css from "./ExpandedTodo.module.css";

type Props = {
  snapshot: Option<QueryDocumentSnapshot<Todo>>;
  onSave: () => unknown;
  className?: string;
};

type Values = {
  title: string;
  notes: string;
  startAt: string;
  dueAt: string;
};

const optionDateToString = flow(
  map(format("yyyy-MM-dd")),
  getOrElse(() => ""),
);

const valuesFromTodo = (todo: Todo): Values => ({
  title: todo.title,
  notes: todo.notes,
  startAt: optionDateToString(todo.startAt),
  dueAt: optionDateToString(todo.dueAt),
});

const emptyValues: Values = {
  title: "",
  notes: "",
  startAt: "",
  dueAt: "",
};

const ExpandedTodo = ({ snapshot, onSave, className }: Props) => {
  const initialValues = reduce<QueryDocumentSnapshot<Todo>, Values>(
    emptyValues,
    (_, snap) => valuesFromTodo(snap.data()),
  )(snapshot);

  const [values, setValues] = useState<Values>(initialValues);

  const handleRepeatButtonClick = () => {
    console.log("hello");
  };

  return (
    <form
      className={classNames(css.root, className)}
      onSubmit={(event) => {
        event.preventDefault();

        if (!isNonEmptyString(values.title)) return;

        const todo: Todo = {
          title: values.title,
          notes: values.notes,
          startAt: fromEither(fromDateInputValue(values.startAt)),
          dueAt: fromEither(fromDateInputValue(values.dueAt)),
          completedAt: none,
        };

        const ref = reduce<
          QueryDocumentSnapshot<Todo>,
          DocumentReference<Todo>
        >(
          doc(todosCollection),
          (_, snap) => snap.ref,
        )(snapshot);

        setDoc(ref, todo).then(onSave);
      }}
    >
      <input
        className={css.title}
        type="text"
        name="title"
        value={values.title}
        onChange={(event) =>
          setValues((v) => ({ ...v, title: event.target.value }))
        }
        placeholder="New Todo"
      />

      <textarea
        className={css.notes}
        name="notes"
        value={values.notes}
        onChange={(event) =>
          setValues((v) => ({ ...v, notes: event.target.value }))
        }
        placeholder="Notes"
      />

      <div className={css.dateField}>
        <label className={css.dateLabel} htmlFor="startAt">
          When
        </label>
        <input
          className={css.dateInput}
          type="date"
          name="startAt"
          id="startAt"
          value={values.startAt}
          onChange={(event) =>
            setValues((v) => ({ ...v, startAt: event.target.value }))
          }
        />
      </div>

      <div className={css.dateField}>
        <label className={css.dateLabel} htmlFor="dueAt">
          Deadline
        </label>
        <input
          className={css.dateInput}
          type="date"
          name="dueAt"
          id="dueAt"
          value={values.dueAt}
          onChange={(event) =>
            setValues((v) => ({ ...v, dueAt: event.target.value }))
          }
        />
      </div>

      <div className={css.actions}>
        <button
          className={css.action}
          type="button"
          onClick={handleRepeatButtonClick}
        >
          Repeat...
        </button>

        <button className={classNames(css.action, css.primary)} type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default ExpandedTodo;
