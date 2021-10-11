import { DocumentChange, QueryDocumentSnapshot } from "@firebase/firestore";
import { reduce } from "fp-ts/Array";
import { deleteAt, upsertAt } from "fp-ts/Map";
import { Eq as stringEq } from "fp-ts/string";
import { useEffect, useState } from "react";
import FirestoreObservable from "lib/Firebase/FirestoreObservable";
import Todo from "types/Todo";

type Todos = Map<string, QueryDocumentSnapshot<Todo>>;

const applyChange = (memo: Todos, { type, doc }: DocumentChange<Todo>) => {
  switch (type) {
    case "added":
    case "modified":
      return upsertAt(stringEq)(doc.id, doc)(memo);

    case "removed":
      return deleteAt(stringEq)(doc.id)(memo);
  }
};

const useTodos = (observable: FirestoreObservable<Todo>): Todos => {
  const [snapshots, setSnapshots] = useState<Todos>(new Map());

  useEffect(() => {
    return observable({
      next: (snapshot) => {
        const changes = snapshot.docChanges();

        setSnapshots((snapshots) => reduce(snapshots, applyChange)(changes));
      },
    });
  }, [observable]);

  return snapshots;
};

export default useTodos;
