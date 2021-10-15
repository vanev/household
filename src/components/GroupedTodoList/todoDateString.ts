import { QueryDocumentSnapshot } from "@firebase/firestore";
import { addDays } from "date-fns/fp";
import { dayOf, weekOf, monthOf, yearOf } from "lib/DateRange";
import { Todo, doAtIsBefore, doAtIsDuring } from "types/Todo";

const todoDateString = (snapshot: QueryDocumentSnapshot<Todo>): string => {
  const todo = snapshot.data();

  const now = new Date();

  if (doAtIsBefore(now)(todo) || doAtIsDuring(dayOf(now))(todo))
    return "1Today";

  if (doAtIsDuring(dayOf(addDays(1)(now)))(todo)) return "2Tomorrow";

  if (doAtIsDuring(weekOf(now))(todo)) return "3This Week";

  if (doAtIsDuring(monthOf(now))(todo)) return "4This Month";

  if (doAtIsDuring(yearOf(now))(todo)) return "5This Year";

  return "6The Future";
};

export default todoDateString;
