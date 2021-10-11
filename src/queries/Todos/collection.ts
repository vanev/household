import * as Firestore from "@firebase/firestore";
import { map } from "fp-ts/Option";
import database from "../../lib/Firebase/database";
import { isNonEmptyString } from "../../lib/String";
import { fromTimestamp } from "../../lib/Date";
import Todo from "../../Todo";

const todoConverter: Firestore.FirestoreDataConverter<Todo> = {
  toFirestore: (todo) => todo,
  fromFirestore: (doc) => {
    const { title, notes, when, deadline, completedAt } = doc.data();

    if (!isNonEmptyString(title)) throw new Error("Title is empty.");

    return {
      title,
      notes,
      when: map(fromTimestamp)(when),
      deadline: map(fromTimestamp)(deadline),
      completedAt: map(fromTimestamp)(completedAt),
    };
  },
};

const collection = Firestore.collection(database, "todos").withConverter(
  todoConverter,
);

export default collection;
