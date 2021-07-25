import { actions, GameState } from "../state";
import { GameStore } from "../stores";
import { FieldType } from "../types";

function expose(gameStore: GameStore, uid: string, field: FieldType): void {
  const payload = { [uid]: field };

  gameStore.events.next({ type: actions.SHOW_FIELD, payload });
}

function flag(state: GameState, uid: string, field: FieldType): void {
  const payload = { [uid]: field };

  state.events.next({ type: actions.FLAG_FIELD, payload });
}

export const helper = {
  expose,
  flag,
};
