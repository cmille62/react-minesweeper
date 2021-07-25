import { BoardAction, BoardPayload, BoardStoreType, FieldType } from "../types";
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

export class GameState {
  events: Subject<BoardAction>;
  store: BehaviorSubject<BoardStoreType>;
  subs: { [x: string]: Subscription } = {};
  uid!: string;

  constructor(events: Subject<BoardAction>) {
    this.events = events;
    this.store = new BehaviorSubject<BoardStoreType>({});
    this.reducer();
  }

  reducer(): void {
    this.subs.events = this.events.subscribe((action: BoardAction) => {
      const state = this.store.getValue();
      const nextState = produce(state, (draftState) => {
        switch (action.type) {
          case actions.SET_FIELD: {
            for (const uid in action.payload) {
              draftState[uid] = action.payload[uid];
            }
            break;
          }
          case actions.SHOW_FIELD: {
            for (const uid in action.payload) {
              console.log("Clicked on: ", uid);
              draftState[uid].exposed = true;
            }
            break;
          }
          case actions.RESET_BOARD: {
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
  initialize(payload: BoardPayload): void {
    this.events.next({ type: actions.SET_FIELD, payload });
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
    const state = this.store.getValue();
    const payload = produce(state, (draftState) => {
      for (const component in draftState) {
        if (draftState[component].exposed) {
          draftState[component].exposed = false;
        }
      }
    });
    this.events.next({ type: actions.SET_FIELD, payload });
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
