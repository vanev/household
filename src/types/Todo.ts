import { isSome, Option } from "fp-ts/Option";
import { NonEmptyString } from "lib/NonEmptyString";

export type Todo = {
  title: NonEmptyString;
  notes: string;
  when: Option<Date>;
  deadline: Option<Date>;
  completedAt: Option<Date>;
};

export const isComplete = (todo: Todo): boolean => isSome(todo.completedAt);

export default Todo;
