export type Unsubscribe = () => void;

export type Observer<E, A> = {
  next?: (value: A) => void;
  error?: (error: E) => void;
  complete?: () => void;
};

export type Observable<E, A> = (observer: Observer<E, A>) => Unsubscribe;

export const merge =
  <E, A>(observables: Array<Observable<E, A>>): Observable<E, A> =>
  (observer) => {
    const unsubscribes = observables.map((observable) => observable(observer));

    return () => unsubscribes.map((unsubscribe) => unsubscribe());
  };
