import { Option } from "fp-ts/Option";
import Day from "lib/Day";
import Month from "lib/Month";
import { NonEmptySet } from "lib/NonEmptySet";

type DayOfMonth = {
  ordinal: number | "last"; // 4th
  dayOfWeek: Day | "day"; // Thursday
};

type DayOfYear = {
  month: Month;
  dayOfMonth: DayOfMonth;
};

type AfterCompletion = {
  type: "AfterCompletion";
  amount: number;
  interval: "day" | "week" | "month" | "year";
  startDaysEarlier: Option<number>;
};

type Daily = {
  type: "Daily";
  amount: number;
  endAt: Option<Date>;
  startDaysEarlier: Option<number>;
};

type Weekly = {
  type: "Weekly";
  interval: number;
  daysOfWeek: NonEmptySet<Day>;
  endAt: Option<Date>;
  startDaysEarlier: Option<number>;
};

type Monthly = {
  type: "Monthly";
  interval: number;
  daysOfMonth: NonEmptySet<DayOfMonth>;
  endAt: Option<Date>;
  startDaysEarlier: Option<number>;
};

type Yearly = {
  type: "Yearly";
  interval: number;
  daysOfYear: NonEmptySet<DayOfYear>;
  endAt: Option<Date>;
  startDaysEarlier: Option<number>;
};

type RecurrancePattern = AfterCompletion | Daily | Weekly | Monthly | Yearly;

export default RecurrancePattern;
