import { NonEmptyString } from "./NonEmptyString";

export const isNonEmptyString = (str: string): str is NonEmptyString =>
  str.length !== 0;
