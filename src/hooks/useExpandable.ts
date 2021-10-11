import { Option, some, none, reduce } from "fp-ts/Option";
import { Predicate } from "fp-ts/Predicate";
import { useEffect, useState } from "react";

const useExpandable = (): [
  Predicate<string>,
  (id: string) => void,
  () => void,
] => {
  const [expandedId, setExpandedId] = useState<Option<string>>(none);

  const isExpanded = (targetId: string): boolean =>
    reduce(false, (_, id) => targetId === id)(expandedId);

  const expand = (id: string) => setExpandedId(some(id));

  const close = () => setExpandedId(none);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  });

  return [isExpanded, expand, close];
};

export default useExpandable;
