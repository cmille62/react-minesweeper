import { onNewCell } from "../store";
import { CellType } from "../types";
import { MineUtils } from "../utils";

/**
 * Generate Cells
 * @param width Board Width
 * @param height Board Height
 * @param mines Total Mines
 */
function generateCells(width: number, height: number, mines: number) {
  let total = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (MineUtils.willBeMine(mines) && total < mines) {
        onNewCell({ xCoord: x, yCoord: y, isMine: true });
        total++;
      } else {
        onNewCell({ xCoord: x, yCoord: y });
      }
    }
  }
}

function countNearby(cells: CellType[], cell: CellType) {
  let around = 0;

  for (let y = cell.yCoord - 1; y < cell.yCoord + 2; y++) {
    for (let x = cell.xCoord - 1; x < cell.xCoord + 2; x++) {
      const cell = cells.find(({ xCoord, yCoord }) => xCoord === x && yCoord === y);
      if (cell?.isMine) {
        around++;
      }
    }
  }
  return around;
}

export const utils = {
  generateCells,
  countNearby,
};