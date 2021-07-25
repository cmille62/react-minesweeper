import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import { RootStore } from "./root.store";

export const useRootStore: () => RootStore = () => {
  return useContext(MobXProviderContext) as RootStore;
};

export { RouterStore } from "mobx-react-router";
export { RootStore } from "./root.store";

export { BoardStore } from "./board.store";
export { GameStore } from "./game.store";
export { TimerStore } from "./timer.store";
export { UserStore } from "./user.store";
