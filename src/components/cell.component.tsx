import React, { FunctionComponent } from "react";
import { onOpenCell, useCell } from "../stream";
import { CidType } from "../types";
import { BoardConst } from "../utils";
import { Board } from "./board.component";

import { styles } from "./cell.css";

interface Props {
  id: CidType;
}

export const Cell: FunctionComponent<Props> = ({ id }: Props) => {
  const { around, xCoord, yCoord } = useCell(id);

  return (
    <div
      className={styles}
      onClick={() => onOpenCell}
      style={{
        top: xCoord * (BoardConst.Cell + 6),
        left: yCoord * (BoardConst.Cell + 6),
      }}
    >
      {/* {item.around ? item.around : ""} */}
      {around}
    </div>
  );
};
