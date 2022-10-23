import { CellStateType } from "../types";

export const BoardConst = {
  Width: 10,
  Height: 10,
  Cell: 25,
  Ratio: 0.5
};

export const CellState: Record<string, CellStateType> = {
  Opened: "opened",
  Unopened: "unopened",
  Flagged: "flagged",
};