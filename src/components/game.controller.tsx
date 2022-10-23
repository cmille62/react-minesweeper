import React, { FunctionComponent, useEffect } from "react";
import { Board, GameStats } from "./index";
import { onNewCell } from "../stream";

import { styles } from "./game.css";

export const Game: FunctionComponent = () => {
  useEffect(() => {
    const width = 10;
    const height = 10;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        console.log(x, y);
        onNewCell({ xCoord: x, yCoord: y });
      }
    }
  }, []);

  return (
    <div className={styles}>
      <Board />
      <GameStats />
    </div>
  );
};
