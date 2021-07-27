import produce from "immer";
import { interval, Observable } from "rxjs";

export class Timer {
  public interval: Observable<number>;
  private paused = true;

  constructor() {
    this.interval = interval(1000);
  }

  // private callback(): void {
  //   const state = this.seconds.getValue();
  //   const nextState = produce(state, (draftState) => {
  //     draftState += 1;
  //   });
  //   this.seconds.next(nextState);

  //   if (!this.paused) {
  //     setTimeout(() => this.callback(), 1000);
  //   }
  // }

  // public start(): void {
  //   this.seconds = 0;
  //   this.resume();
  // }

  // public reset(): void {
  //   const state = this.seconds.getValue();
  //   const nextState = produce(state, (draftState) => {
  //     draftState = 0;
  //   });
  //   this.seconds.next(nextState);
  // }

  // public pause(): void {
  //   this.paused = true;
  // }

  // public resume(): void {
  //   this.paused = false;
  //   setTimeout(() => this.callback(), 1000);
  // }
}
