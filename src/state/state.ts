import {
  BoardAction,
  BoardPayload,
  BoardStoreType,
  FieldType,
  GameStatus,
  GAME_STATUS,
} from "../types";
import {
  BehaviorSubject,
  distinctUntilChanged,
  Observable,
  pluck,
  Subject,
  Subscription,
  tap,
} from "rxjs";
import { actions } from "./actions";
import produce from "immer";
import { Timer } from "./timer";

export class GameState {
  events: Subject<BoardAction>;
  store: BehaviorSubject<BoardStoreType>;
  subs: { [x: string]: Subscription } = {};

  timer: Timer;

  status: GameStatus = GAME_STATUS.Initial;
  remaining = 0;
  toWin = 0;

  initial = 0;
  mines = 0;

  constructor(events: Subject<BoardAction>) {
    this.events = events;
    this.store = new BehaviorSubject<BoardStoreType>({});
    this.timer = new Timer();

    this.reducer();
  }

  reducer(): void {
    this.subs.events = this.events.subscribe((action: BoardAction) => {
      const payload = action.payload as BoardPayload;
      const state = this.store.getValue();
      const nextState = produce(state, (draftState) => {
        if (this.status === GAME_STATUS.Initial) {
          this.status = GAME_STATUS.Good;
          this.timer.start();
        }
        switch (action.type) {
          case actions.UPDATE_REMAINING: {
            this.remaining = action.payload as number;
            break;
          }
          case actions.UPDATE_STATUS: {
            this.status = action.payload as GameStatus;
            break;
          }
          case actions.SET_FIELD: {
            for (const uid in payload) {
              draftState[uid] = payload[uid];
            }
            break;
          }
          case actions.FLAG_FIELD: {
            for (const uid in payload) {
              draftState[uid].flagged = !draftState[uid].flagged;
              let remaining = this.remaining;
              if (draftState[uid].flagged) {
                remaining--;
              } else {
                remaining++;
              }
              this.events.next({
                type: actions.UPDATE_REMAINING,
                payload: remaining,
              });
            }
            break;
          }
          case actions.SHOW_FIELD: {
            for (const uid in payload) {
              draftState[uid].exposed = true;
              this.toWin--;

              if (!this.toWin) {
                this.timer.stop();
                this.events.next({
                  type: actions.UPDATE_STATUS,
                  payload: GAME_STATUS.Win,
                });
              }
            }
            break;
          }
          case actions.RESET_BOARD: {
            this.timer.stop();
            this.timer.seconds = 0;
            this.reset();
          }
        }
      });
      this.store.next(nextState);
    });
  }

  /**
   * Initialize the board with a provided board configuration
   * @param config board configuration
   */
  initialize(payload: BoardPayload, mines: number, total: number): void {
    this.events.next({ type: actions.SET_FIELD, payload });

    this.events.next({
      type: actions.UPDATE_REMAINING,
      payload: mines,
    });

    this.toWin = total;
    this.initial = total;
    this.mines = mines;
  }

  /**
   * Returns all unique ids of the board
   */
  getUids(): string[] {
    return Object.keys(this.store.getValue());
  }

  /**
   * Returns all fields based on the unique ids
   * @param uids ids of the form components
   * @returns
   */
  getComponents(uids: string[]): BoardStoreType {
    const state = this.store.getValue();
    const result = produce(state, (draftState) => {
      const filtered: BoardStoreType = {};
      for (const uid of uids) {
        filtered[uid] = draftState[uid];
      }
      return filtered;
    });
    return result;
  }

  getAll(): BoardStoreType {
    return this.store.getValue();
  }

  /**
   * Returns an field based on the unique id
   * @param uids ids of the form component
   * @returns
   */
  getComponent(uid: string): FieldType {
    const state = this.store.getValue();
    const result = produce(state, (draftState) => {
      return { [uid]: draftState[uid] };
    });
    return result[uid];
  }

  /**
   * return an observable of the component, only returns a new value if there was an update
   * @param cid id of the component
   * @param debug flag for testing
   */
  getStore(cid: string, debug = false): Observable<FieldType> {
    const obs = this.store.pipe(pluck(cid), distinctUntilChanged());
    if (debug) {
      obs.pipe(
        tap((comp) => {
          console.log("component update", comp);
        })
      );
    }
    return obs;
  }

  /**
   * Reset the current board
   */
  reset(): void {
    this.toWin = this.initial;
    const state = this.store.getValue();
    const payload = produce(state, (draftState) => {
      for (const component in draftState) {
        draftState[component].exposed = false;
        draftState[component].flagged = false;
      }
    });
    this.events.next({ type: actions.SET_FIELD, payload });

    this.events.next({
      type: actions.UPDATE_STATUS,
      payload: GAME_STATUS.Initial,
    });

    this.events.next({
      type: actions.UPDATE_REMAINING,
      payload: this.mines,
    });
  }

  /**
   * Memory cleanup after store is destroyed
   */
  destroy(): void {
    for (const sub in this.subs) {
      this.subs[sub].unsubscribe();
    }
    this.store.complete();
  }
}
