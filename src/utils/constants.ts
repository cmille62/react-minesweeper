import { CellStateType } from "../types";

export const BoardConst = {
  Width: 10,
  Height: 10,
  Ratio: 0.1
};

export const CellState: Record<string, CellStateType> = {
  Opened: "opened",
  Unopened: "unopened",
  Flagged: "flagged",
};