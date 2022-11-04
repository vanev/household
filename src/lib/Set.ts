import { isEmpty } from "fp-ts/Set";
import { NonEmptySet } from "./NonEmptySet";

export const isNonEmptySet = <T>(set: Set<T>): set is NonEmptySet<T> =>
  isEmpty(set);
