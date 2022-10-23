import React, { FunctionComponent } from "react";
import { useCells } from "../stream";
import { Cell } from "./index";
import { range } from "lodash";

import { styles, row } from "./board.css";

export const Board: FunctionComponent = () => {
  const width = 10;
  const height = 10;
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
