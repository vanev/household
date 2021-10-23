import { isBefore as dateIsBefore } from "date-fns/fp";
import { Ord as dateOrd } from "fp-ts/Date";
import { flow } from "fp-ts/function";
import { NonEmptyString } from "lib/NonEmptyString";
import { Option, isSome, map, getOrElse, getOrd } from "fp-ts/Option";
import { Ord, between, contramap } from "fp-ts/Ord";
import { Predicate } from "fp-ts/Predicate";
import { DateRange } from "lib/DateRange";

export type Todo = {
  title: NonEmptyString;
  notes: string;
  startAt: Option<Date>;
  dueAt: Option<Date>;
  completedAt: Option<Date>;
};

export const isComplete = (todo: Todo): boolean => isSome(todo.completedAt);

export const startAt = (todo: Todo): Option<Date> => todo.startAt;

export const dueAt = (todo: Todo): Option<Date> => todo.dueAt;

export const doAt = (todo: Todo): Option<Date> =>
  isSome(todo.startAt) ? todo.startAt : todo.dueAt;

export const doAtIs = (predicate: Predicate<Date>) =>
  flow(
    doAt,
    map(predicate),
    getOrElse(() => false),
  );

export const doAtIsBefore = (target: Date) => doAtIs(dateIsBefore(target));

export const doAtIsDuring = ([start, end]: DateRange) =>
  doAtIs(between(dateOrd)(start, end));

export const ordDoAt: Ord<Todo> = contramap(doAt)(getOrd(dateOrd));

export default Todo;
