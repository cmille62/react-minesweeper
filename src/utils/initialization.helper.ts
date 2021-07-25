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

/**
 * Todo: Improve this, doesn't factor in mines, and doesn't distribute like I want
 * @param param0
 * @returns
 */
function generateBoard({
  uid,
  width,
  height,
  mines,
}: BoardParsedType): BoardPayload {
  const rand = seed(uid);
  const payload: BoardPayload = {};

  let tot = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const id = UID.generate(x, y);
      const is = randn_bm(rand);
      if (is > 0.6) {
        tot++;
      }
      payload[id] = {
        type: is > 0.5 ? FIELD.Mine : FIELD.Default,
        exposed: false,
        adjacent: 0,
      };
    }
  }
  console.log(tot);

  return payload;
}

function randn_bm(rand: any): any {
  let u = 0,
    v = 0;
  while (u === 0) u = rand(); //Converting [0,1) to (0,1)
  while (v === 0) v = rand();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm(rand); // resample between 0 and 1
  return num;
}

export const helper = {
  generateRemaining,
  generateBoard,
};
