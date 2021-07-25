import { observable, action, makeObservable } from "mobx";
import { BoardParsedType, GAME_STATUS } from "../types";
import { nanoid } from "nanoid";
import { environment } from "../utils";

export class BoardStore {
  public width = environment.DEFAULT_BOARD_WIDTH;
  public height = environment.DEFAULT_BOARD_HEIGHT;
  public mines = 10;
  public status = GAME_STATUS.Good;
  public uid = nanoid();

  public size = environment.DEFAULT_BOARD_SIZE;

  constructor() {
    makeObservable(this, {
      width: observable,
      height: observable,
      mines: observable,
      status: observable,

      size: observable,

      uid: observable,

      initialize: action,
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
    this.status = GAME_STATUS.Good;

    if (uid) {
      this.uid = uid;
    }
  }
}
