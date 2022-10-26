import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Board, GameStats } from "./index";
import { onAddMine, onNewCell } from "../store";
import { useBoard } from "../hooks";

import { styles } from "./game.css";
import { MineUtils } from "../utils";

export const Game: FunctionComponent = () => {
  const { width, height, mines } = useBoard();

  useEffect(() => {
    let total = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (MineUtils.willBeMine(mines) && total < mines) {
          onAddMine("");
          onNewCell({ xCoord: x, yCoord: y, isMine: true });
          total++;
        } else {
          onNewCell({ xCoord: x, yCoord: y });
        }
      }
    }
  }, []);

  return (
    <Fragment>
      <div className={styles.boardWrapper}>
        <Board />
      </div>
      <GameStats />
    </Fragment>
  );
};
