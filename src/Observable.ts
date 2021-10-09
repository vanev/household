export type Unsubscribe = () => void;

export type Observer<E, A> = {
  next?: (value: A) => void;
  error?: (error: E) => void;
  complete?: () => void;
};

export type Observable<E, A> = (observer: Observer<E, A>) => Unsubscribe;
