import { Either, left, right } from "fp-ts/Either";

export type NonEmptyString = string & { _: "NonEmptyString" };

export const fromString = (str: string): Either<Error, NonEmptyString> => {
  if (str.length === 0) return left(new Error("String is empty."));

  return right(str as NonEmptyString);
};
