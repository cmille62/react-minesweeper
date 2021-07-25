import { actions } from "../state";
import { GameStore } from "../stores";
import { FieldType } from "../types";

function expose(gameStore: GameStore, uid: string, field: FieldType): void {
  const payload = { [uid]: field };

  gameStore.events.next({ type: actions.SHOW_FIELD, payload });
}

export const helper = {
  expose,
};
