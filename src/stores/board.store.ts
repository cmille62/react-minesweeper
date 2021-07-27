import { observable, makeObservable } from "mobx";
import { BoardParsedType } from "../types";
import { nanoid } from "nanoid";
import { environment } from "../utils";

export class BoardStore {
  public width!: number;
  public height!: number;
  public mines!: number;
  public uid = nanoid();

  public size = environment.DEFAULT_BOARD_SIZE;

  constructor() {
    makeObservable(this, {
      width: observable,
      height: observable,
      mines: observable,

      size: observable,

      uid: observable,
    });
  }

  /**
   * Initialize the Board Store with the parameters to the board
   * @param param0
   */
  public initialize({ width, height, mines, uid }: BoardParsedType): void {
    this.width = width;
    this.height = height;
    this.mines = mines;

    if (uid) {
      this.uid = uid;
    }
  }
}
