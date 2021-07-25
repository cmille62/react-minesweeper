import React, { FunctionComponent } from "react";
import { Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import { useRootStore } from "../../stores";
import { Field } from "./field.component";
import { UID } from "../../utils";

interface Props {
  y: number;
}

export const BoardRow: FunctionComponent<Props> = observer(({ y }: Props) => {
  const { boardStore, gameStore } = useRootStore();
  return (
    <Pane display="flex" flexDirection="row" flexShrink={0}>
      {[...Array(boardStore.width)].map((_, x) => {
        const uid = UID.generate(x, y);
        const field = gameStore.state.getComponent(uid);
        return <Field key={uid} {...{ ...field, uid, x, y }} />;
      })}
    </Pane>
  );
});
