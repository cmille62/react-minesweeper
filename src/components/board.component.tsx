import React, { FunctionComponent } from "react";
import { useCells } from "../stream";
import { Cell } from "./cell.component";
import { range } from "lodash";

import { styles } from "./board.css";

export const Board: FunctionComponent = () => {
  const width = 10;
  const height = 10;
  const cells = useCells();

  console.log(cells);

  return (
    <div className={styles}>
      {range(height).map((y) => (
        <div key={`row-${y}`}>
          {range(width).map((x) => {
            const id = `${x}-${y}`;
            return <Cell key={id} id={id} />;
          })}
        </div>
      ))}
    </div>
  );
};
