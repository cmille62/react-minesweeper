import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Board, GameStats } from "./index";
import { GenerateUtils } from "../utils";
import { useBoard } from "../hooks";

import { styles } from "./game.css";
import { countNearby } from "../store/board/cell.state";

export const Game: FunctionComponent = () => {
  const { width, height, mines } = useBoard();

  useEffect(() => {
    GenerateUtils.generateCells(width, height, mines);

    countNearby();
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
