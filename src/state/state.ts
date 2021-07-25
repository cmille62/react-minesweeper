import { BoardAction, BoardPayload, BoardStoreType, FieldType } from "../types";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { actions } from "./actions";
import { nanoid } from "nanoid";
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
            for (const cid in action.payload) {
              draftState[cid] = action.payload[cid];
            }
            break;
          }
          case actions.SHOW_FIELD: {
            for (const cid in action.payload) {
              draftState[cid].exposed = true;
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

    // this.subs.data = this.store
    //   .pipe(distinctUntilChanged())
    //   .subscribe((store) => {
    //     const data = this.getData();
    //     this.data.next(data);
    //   });

    // this.subs.cleaner = this.store
    //   .pipe(distinctUntilChanged(), debounceTime(1000))
    //   .subscribe((store) => {
    //     if (store) {
    //       for (const cid in store) {
    //         const parent = store[cid]?.config?.parent;
    //         if (parent && !store?.[parent]?.config?.components.includes(cid)) {
    //           const components = this.selectRelatedComponents(cid);
    //           this.events.next({
    //             type: actions.REMOVE_ALL,
    //             payload: components,
    //           });
    //         }
    //       }
    //     }
    //   });
  }

  /**
   * Initialize the board with a provided board configuration
   * @param config board configuration
   */
  initialize(config: FieldType[]): void {
    const payload: BoardPayload = {};
    config.forEach((each) => {
      payload[nanoid()] = each;
    });
    this.events.next({ type: actions.INITIALIZE_BOARD, payload });
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

  /**
   * Returns an field based on the unique id
   * @param uids ids of the form component
   * @returns
   */
  getComponent(uid: string): FieldType {
    const state = this.store.getValue();
    const result = produce(state, (draftState) => {
      return { uid: draftState[uid] };
    });
    return result[uid];
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
