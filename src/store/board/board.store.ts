import { count, Subject } from "rxjs";

const subject = new Subject();

/**
 * Board Subject
 */
export const service = {
  setWidth: (width: number) => subject.next({ width }),
  setHeight: (height: number) => subject.next({ height }),
  setRatio: (ratio: number) => subject.next({ ratio }),

  onUpdate: () => subject.asObservable(),
  onNewGame: () => subject.asObservable(),
  onReset: () => subject.asObservable(),
};
