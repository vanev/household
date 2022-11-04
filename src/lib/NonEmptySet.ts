import { Either, left, right } from "fp-ts/Either";
import { isEmpty } from "fp-ts/Set";

export type NonEmptySet<T> = Set<T> & { _: "NonEmptySet" };

export const fromSet = <T>(set: Set<T>): Either<Error, NonEmptySet<T>> =>
  isEmpty(set)
    ? left(new Error("Set is empty."))
    : right(set as NonEmptySet<T>);
