import React, { FunctionComponent } from "react";
import {
  IconButton,
  EmojiIcon,
  ResetIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "evergreen-ui";
import { useRootStore } from "../../stores";
import { CenterPane, Counter } from "../../common";
import { observer } from "mobx-react";

const icon = {
  win: ThumbsUpIcon,
  good: EmojiIcon,
  failure: ThumbsDownIcon,
  reset: ResetIcon,
};

export const GameHead: FunctionComponent = observer(() => {
  const { boardStore, timerStore, gameStore } = useRootStore();
  return (
    <CenterPane justifyContent="space-between">
      <Counter count={99} />
      <IconButton
        appearance="minimal"
        icon={icon[boardStore.status]}
        onClick={() => {
          gameStore.state.reset();
          boardStore.reset();
          timerStore.reset();
        }}
      />
      <Counter count={timerStore.seconds} />
    </CenterPane>
  );
});
