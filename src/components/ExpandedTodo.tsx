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
import { fromDateInputValue } from "../Date";
import { isNonEmptyString } from "../String";
import Todo from "../Todo/types/Todo";
import todosCollection from "../Todo/queries/collection";
import css from "./ExpandedTodo.module.css";

type Props = {
  snapshot: Option<QueryDocumentSnapshot<Todo>>;
  onSave: () => unknown;
  className?: string;
};

type Values = {
  title: string;
  notes: string;
  when: string;
  deadline: string;
};

const optionDateToString = flow(
  map(format("yyyy-MM-dd")),
  getOrElse(() => ""),
);

const valuesFromTodo = (todo: Todo): Values => ({
  title: todo.title,
  notes: todo.notes,
  when: optionDateToString(todo.when),
  deadline: optionDateToString(todo.deadline),
});

const emptyValues: Values = {
  title: "",
  notes: "",
  when: "",
  deadline: "",
};

const ExpandedTodo = ({ snapshot, onSave, className }: Props) => {
  const initialValues = reduce<QueryDocumentSnapshot<Todo>, Values>(
    emptyValues,
    (_, snap) => valuesFromTodo(snap.data()),
  )(snapshot);

  const [values, setValues] = useState<Values>(initialValues);

  return (
    <form
      className={classNames(css.root, className)}
      onSubmit={(event) => {
        event.preventDefault();

        if (!isNonEmptyString(values.title)) return;

        const todo: Todo = {
          title: values.title,
          notes: values.notes,
          when: fromEither(fromDateInputValue(values.when)),
          deadline: fromEither(fromDateInputValue(values.deadline)),
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
        <label className={css.dateLabel} htmlFor="when">
          When
        </label>
        <input
          className={css.dateInput}
          type="date"
          name="when"
          id="when"
          value={values.when}
          onChange={(event) =>
            setValues((v) => ({ ...v, when: event.target.value }))
          }
        />
      </div>

      <div className={css.dateField}>
        <label className={css.dateLabel} htmlFor="deadline">
          Deadline
        </label>
        <input
          className={css.dateInput}
          type="date"
          name="deadline"
          id="deadline"
          value={values.deadline}
          onChange={(event) =>
            setValues((v) => ({ ...v, deadline: event.target.value }))
          }
        />
      </div>

      <button className={css.saveButton} type="submit">
        Save
      </button>
    </form>
  );
};

export default ExpandedTodo;
