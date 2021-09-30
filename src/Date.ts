import { Timestamp } from "@firebase/firestore";
import { parse, isValid } from "date-fns/fp";
import { Either, left, right } from "fp-ts/Either";

export const fromDateInputValue = (value: string): Either<Error, Date> => {
  const date = parse(new Date(), "yyyy-MM-dd", value);

  if (isValid(date)) return right(date);

  return left(new Error(`Cannot parse ${value} as Date.`));
};

export const fromTimestamp = (ts: Timestamp): Date => ts.toDate();
