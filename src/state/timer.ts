import { Observable, Subject, timer } from "rxjs";
import { map, repeatWhen, takeUntil } from "rxjs/operators";

export class Timer {
  readonly observable$: Observable<number>;
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();
  public seconds = 0;

  constructor(delay = 1000) {
    this._stop.next();
    this.observable$ = timer(0, delay).pipe(
      map(() => {
        this.seconds++;
        return this.seconds;
      }),
      takeUntil(this._stop),
      repeatWhen(() => this._start)
    );
  }

  start(): void {
    this._start.next();
  }

  stop(): void {
    this._stop.next();
  }

  reset(): void {
    this.seconds = 0;
    this._stop.next();
  }
}
