import * as stores from "./index";
import { syncHistoryWithStore } from "mobx-react-router";
import { createBrowserHistory } from "history";
import { History } from "history";

interface Stores {
  routerStore: stores.RouterStore;
  boardStore: stores.BoardStore;
  gameStore: stores.GameStore;
  timerStore: stores.TimerStore;
  userStore: stores.UserStore;
}

/**
 * Root store of the application
 */
export class RootStore {
  public routerStore: stores.RouterStore;
  public history: History;

  public boardStore: stores.BoardStore;
  public gameStore: stores.GameStore;
  public timerStore: stores.TimerStore;
  public userStore: stores.UserStore;

  public constructor() {
    const browserHistory = createBrowserHistory();

    this.routerStore = new stores.RouterStore();
    this.history = syncHistoryWithStore(browserHistory, this.routerStore);

    this.boardStore = new stores.BoardStore();
    this.gameStore = new stores.GameStore();
    this.timerStore = new stores.TimerStore();
    this.userStore = new stores.UserStore();
  }

  public getProviderStores(): Stores {
    return {
      routerStore: this.routerStore,
      boardStore: this.boardStore,
      gameStore: this.gameStore,
      timerStore: this.timerStore,
      userStore: this.userStore,
    };
  }
}
