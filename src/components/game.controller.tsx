import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Board, GameStats } from "./index";
import { onNewCell } from "../stream";

import { styles } from "./game.css";

export const Game: FunctionComponent = () => {
  useEffect(() => {
    const width = 10;
    const height = 10;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        onNewCell({ xCoord: x, yCoord: y });
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
