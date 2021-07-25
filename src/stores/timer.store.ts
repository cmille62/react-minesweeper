import { observable, action, makeObservable, runInAction } from "mobx";

export class TimerStore {
  public seconds = 0;
  private paused = true;

  constructor() {
    makeObservable(this, {
      seconds: observable,

      start: action,
      reset: action,
    });
  }

  private callback(): void {
    runInAction(() => {
      this.seconds++;
    });

    if (!this.paused) {
      setTimeout(() => this.callback(), 1000);
    }
  }

  public start(): void {
    this.seconds = 0;
    this.resume();
  }

  public reset(): void {
    this.seconds = 0;
  }

  public pause(): void {
    this.paused = true;
  }

  public resume(): void {
    this.paused = false;
    setTimeout(() => this.callback(), 1000);
  }
}
