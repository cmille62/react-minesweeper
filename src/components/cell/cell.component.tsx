import React, { FunctionComponent } from "react";
import { BombIcon, FlagIcon } from "../../assets";
import { onFlagCell, onOpenCell, useCell } from "../../store";
import { CidType } from "../../types";
import { CellState } from "../../utils";

import { styles, uncovered } from "./cell.css";

interface Props {
  id: CidType;
}

export const Cell: FunctionComponent<Props> = ({ id }: Props) => {
  const { around, state, isMine } = useCell(id);

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
      {state === CellState.Opened && !isMine && !!around && (
        <span>{around}</span>
      )}
      {state === CellState.Flagged && <FlagIcon />}
      {state === CellState.Opened && isMine && <BombIcon />}
    </div>
  );
};
