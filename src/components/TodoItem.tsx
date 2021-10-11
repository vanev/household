import { QueryDocumentSnapshot } from "@firebase/firestore";
import { some } from "fp-ts/Option";
import ClosedTodo from "./ClosedTodo";
import ExpandedTodo from "./ExpandedTodo";
import Todo from "types/Todo";

type Props = {
  snapshot: QueryDocumentSnapshot<Todo>;
  onSave: () => void;
  onExpandClick: () => void;
  isExpanded?: boolean;
  className?: string;
};

const TodoItem = ({
  snapshot,
  className,
  onSave,
  onExpandClick,
  isExpanded = false,
}: Props) =>
  isExpanded ? (
    <ExpandedTodo
      className={className}
      snapshot={some(snapshot)}
      onSave={onSave}
    />
  ) : (
    <ClosedTodo
      className={className}
      snapshot={snapshot}
      onExpandClick={onExpandClick}
    />
  );

export default TodoItem;
