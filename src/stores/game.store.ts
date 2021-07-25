import { observable, makeObservable } from "mobx";
import { Subject } from "rxjs";
import { GameState } from "../state";
import { BoardAction } from "../types";

export class GameStore {
  events: Subject<BoardAction>;
  state: GameState;

  constructor() {
    makeObservable(this, {
      state: observable,
    });

    this.events = new Subject();
    this.state = new GameState(this.events);
  }

  /**
   * Memory cleanup of state
   */
  destroy(): void {
    this.events.complete();
    this.state.destroy();
  }
}
