import React, { FunctionComponent } from "react";
import { useCells } from "../store";
import { Cell } from "./index";
import { range } from "lodash";

import { styles, row } from "./board.css";
import { useBoard } from "../hooks/board.hook";

export const Board: FunctionComponent = () => {
  const { width, height } = useBoard();
  const cells = useCells();

  console.log(cells);

  return (
    <div className={styles}>
      {range(height).map((y) => (
        <div className={row} key={`row-${y}`}>
          {range(width).map((x) => {
            const id = `${x}-${y}`;

            if (cells.includes(id)) {
              return <Cell key={id} id={id} />;
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};
