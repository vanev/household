import { NonEmptyString } from "./lib/NonEmptyString";

export const isNonEmptyString = (str: string): str is NonEmptyString =>
  str.length !== 0;
