import {
  endOfDay,
  endOfMonth,
  endOfWeekWithOptions,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeekWithOptions,
  startOfYear,
} from "date-fns/fp";
import { Range } from "lib/Range";

const startOfWeek = startOfWeekWithOptions({ weekStartsOn: 1 });
const endOfWeek = endOfWeekWithOptions({ weekStartsOn: 1 });

export type DateRange = Range<Date>;

export const dayOf = (date: Date): DateRange => [
  startOfDay(date),
  endOfDay(date),
];

export const weekOf = (date: Date): DateRange => [
  startOfWeek(date),
  endOfWeek(date),
];

export const monthOf = (date: Date): DateRange => [
  startOfMonth(date),
  endOfMonth(date),
];

export const yearOf = (date: Date): DateRange => [
  startOfYear(date),
  endOfYear(date),
];
