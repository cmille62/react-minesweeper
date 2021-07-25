import React, { FunctionComponent } from "react";
import { Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import { useRootStore } from "../../stores";

export const Board: FunctionComponent = observer(() => {
  const { boardStore } = useRootStore();
  return <Pane>{boardStore.width}</Pane>;
});
