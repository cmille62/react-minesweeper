import React, { FunctionComponent } from "react";
import { Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import { useRootStore } from "../../stores";
import { BoardRow } from "./row.component";

export const Board: FunctionComponent = observer(() => {
  const { boardStore } = useRootStore();
  return (
    <Pane background="tint1" display="inline-flex" flexDirection="column">
      {[...Array(boardStore.width)].map((_, y) => (
        <BoardRow key={`board-${y}`} y={y} />
      ))}
    </Pane>
  );
});
