
import { map, scan } from "rxjs/operators";
import { bind, shareLatest } from "@react-rxjs/core";
import {
  createSignal,
  partitionByKey,
  combineKeys,
  mergeWithKey
} from "@react-rxjs/utils";
import { CellState, generateCid } from "../utils";
import { CellType, CidType } from "../types";


const [newCell$, onNewCell] = createSignal<{ xCoord: number; yCoord: number}>();
const [openCell$, onOpenCell] = createSignal<CidType>();
const [flagCell$, onFlagCell] = createSignal<CidType>();


const cellActions$ = mergeWithKey({
  add: newCell$.pipe(map(({xCoord, yCoord}) => ({id: generateCid(xCoord, yCoord), xCoord, yCoord}))),
  open: openCell$.pipe(map((id) => ({ id }))),
  flag: flagCell$.pipe(map((id) => ({ id }))),
});

const [cellsById, keys$] = partitionByKey(
  cellActions$,
  (event) => event.payload.id,
  (event$, id) =>
    event$.pipe(
      scan(
        (state, action) => {
          console.log(action);
          switch (action.type) {
          case "add":
            return {...state, ...action.payload};
          case "open":
            return {...state, state: CellState.Opened };
          case "flag":
            if (state.state === CellState.Flagged) {
              return { ...state, state: CellState.Unopened };

            }
            return { ...state, state: CellState.Flagged };
          default:
            return state;
          }
        },
          { id, xCoord: 0, yCoord: 0, around: 0, isMine: false, state: CellState.Unopened } as CellType
      )
    )
);

export const [useCells] = bind(keys$);
export const [useCell] = bind((id: CidType) => cellsById(id));

const cellsMap$ = combineKeys(keys$, cellsById);

const cellsList$ = cellsMap$.pipe(
  map((x) => [...x.values()]),
  shareLatest()
);

/**
 * Game Statistics
 */
export const [useGameStats] = bind(
  cellsList$.pipe(
    map((cells) => {
      const total = cells.length;
      const revealed = cells.filter((cell) => cell.state === CellState.Opened).length;
      const flagged = cells.filter((cell) => cell.state === CellState.Flagged).length;
      const unrevealed = total - revealed;
      const percentageUncovered =
        total === 0 ? 0 : Math.round((revealed / total) * 100);
      const percentageFlagged =
          total === 0 ? 0 : Math.round((flagged / total) * 100);

      return {
        total,
        revealed,
        unrevealed,
        percentageUncovered,
        percentageFlagged,
      };
    })
  ),
  { total: 0,
    revealed: 0,
    unrevealed: 0,
    percentageUncovered: 0,
    percentageFlagged: 0, }
);

export { onFlagCell, onOpenCell, onNewCell };