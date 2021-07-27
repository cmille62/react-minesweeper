import { BoardParsedType, BoardPayload, FIELD } from "../types";
import { UID } from "./index";
import seed from "seedrandom";

function generateRemaining(
  width: number,
  height: number,
  mines: number
): number {
  return width * height - mines;
}

function countEmpty({ width, height, mines }: BoardParsedType) {
  return width * height - mines;
}

/**
 * Generate a board, including mines, and proximity
 * @param param0
 * @returns
 */
function generateBoard(props: BoardParsedType): BoardPayload {
  const payload: BoardPayload = populate(props);
  const { height, width } = props;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const id = UID.generate(x, y);
      if (!payload[id]) {
        payload[id] = {
          type: FIELD.Default,
          exposed: false,
          adjacent: around(payload, x, y),
        };
      }
    }
  }

  return payload;
}

/**
 * Generate n mines within the (0,0) - (width,height) plane
 * @param param0
 * @returns Board Payload
 */
function populate({
  uid,
  width,
  height,
  mines,
}: BoardParsedType): BoardPayload {
  const rand = seed(uid);
  const payload: BoardPayload = {};

  for (let index = 0; index < mines; ) {
    const x = Math.floor(rand() * width);
    const y = Math.floor(rand() * height);
    const id = UID.generate(x, y);

    if (payload[id]) {
      continue;
    } else {
      payload[id] = { type: FIELD.Mine, exposed: false, adjacent: 0 };
      index++;
    }
  }

  return payload;
}

/**
 * Count the mines next to each empty field
 * @param payload
 * @param x X-Coordinate of field
 * @param y Y-Coordinate of field
 * @returns Board Payload
 */
function around(payload: BoardPayload, x: number, y: number): number {
  let result = 0;
  const xCoords = [x - 1, x, x + 1];
  const yCoords = [y - 1, y, y + 1];

  xCoords.forEach((xx) => {
    if (xx > -1) {
      yCoords.forEach((yy) => {
        if (yy > -1) {
          const id = UID.generate(xx, yy);
          const config = payload[id];

          if (config?.type === FIELD.Mine) {
            result += 1;
          }
        }
      });
    }
  });

  return result;
}

export const helper = {
  generateRemaining,
  generateBoard,
  countEmpty,
};
