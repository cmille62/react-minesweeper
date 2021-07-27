import React, { FunctionComponent } from "react";
import { Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import { useRootStore } from "../../stores";
import { BoardRow } from "./row.component";
import { Loading } from "../../common";

export const Board: FunctionComponent = observer(() => {
  const { boardStore } = useRootStore();

  if (!boardStore.height) {
    return <Loading />;
  }
  return (
    <Pane
      background="tint1"
      display="inline-flex"
      flexDirection="column"
      alignItems="center"
      padding={16}
    >
      {[...Array(boardStore.height)].map((_, y) => (
        <BoardRow key={`board-${y}`} y={y} />
      ))}
    </Pane>
  );
});
