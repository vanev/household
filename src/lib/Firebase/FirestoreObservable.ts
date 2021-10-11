import { FirestoreError, QuerySnapshot } from "@firebase/firestore";
import { Observable } from "../Observable";

type FirestoreObservable<T> = Observable<FirestoreError, QuerySnapshot<T>>;

export default FirestoreObservable;
