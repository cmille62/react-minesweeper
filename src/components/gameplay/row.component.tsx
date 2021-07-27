import React, { FunctionComponent, useEffect, useState } from "react";
import { Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import { useRootStore } from "../../stores";
import { Field } from "./field.component";
import { UID } from "../../utils";
import { GAME_STATUS } from "../../types";
import { actions } from "../../state";

interface Props {
  y: number;
}

export const BoardRow: FunctionComponent<Props> = observer(({ y }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const { boardStore, gameStore } = useRootStore();

  useEffect(() => {
    const sub = gameStore.events.subscribe(({ type, payload }) => {
      if (type === actions.UPDATE_STATUS) {
        setDisabled(payload !== GAME_STATUS.Good);
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <Pane display="flex" flexDirection="row" flexShrink={0}>
      {[...Array(boardStore.width)].map((_, x) => {
        const uid = UID.generate(x, y);
        const field = gameStore.state.getComponent(uid);
        return <Field key={uid} {...{ ...field, uid, x, y, disabled }} />;
      })}
    </Pane>
  );
});
