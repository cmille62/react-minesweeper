import React, { FunctionComponent } from "react";
import { FlagIcon } from "../../assets";
import { onFlagCell, onOpenCell, useCell } from "../../stream";
import { CidType } from "../../types";
import { CellState } from "../../utils";

import { styles, uncovered } from "./cell.css";

interface Props {
  id: CidType;
}

export const Cell: FunctionComponent<Props> = ({ id }: Props) => {
  const { around, state } = useCell(id);

  return (
    <div
      className={`${styles} ${state === CellState.Opened ? uncovered : ""}`}
      onClick={() => {
        onOpenCell(id);
      }}
      onContextMenu={(event) => {
        event.preventDefault();

        onFlagCell(id);
      }}
    >
      {state === CellState.Opened && around}
      {state === CellState.Flagged && <FlagIcon />}
    </div>
  );
};
