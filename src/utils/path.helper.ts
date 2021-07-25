import { actions, GameState } from "../state";
import { BoardPayload, FIELD } from "../types";
import { UID } from "./index";

/**
 * Recursively traverse the board to reveal empty spots.
 * @param state Game State
 * @param x X-Coordinate to be traversed upon
 * @param y Y-Coordinate to be traversed upon
 * @returns void
 */
function traverse(state: GameState, x: number, y: number): void {
  const uid = UID.generate(x, y);
  const config = state.getComponent(uid);

  if (!config || config.exposed) {
    return;
  }

  const payload: BoardPayload = { [uid]: config };
  state.events.next({ type: actions.SHOW_FIELD, payload });

  if (!config.adjacent && config.type === FIELD.Default) {
    const xCoords = [x - 1, x, x + 1];
    const yCoords = [y - 1, y, y + 1];

    xCoords.forEach((xx) => {
      if (xx > -1) {
        yCoords.forEach((yy) => {
          if (yy > -1) {
            traverse(state, xx, yy);
          }
        });
      }
    });
  }
}

export const helper = {
  traverse,
};
