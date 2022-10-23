export type CellStateType = "opened" | "unopened" | "flagged";

export interface CellType {
    xCoord: number;
    yCoord: number;
    around: number;

    isMine: boolean;
    state: CellStateType;
}