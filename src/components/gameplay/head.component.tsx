import React, { FunctionComponent, useEffect, useState } from "react";
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
  initial: EmojiIcon,
  win: ThumbsUpIcon,
  good: EmojiIcon,
  failure: ThumbsDownIcon,
  reset: ResetIcon,
};

export const GameHead: FunctionComponent = observer(() => {
  const { boardStore, gameStore } = useRootStore();
  const [seconds, setSeconds] = useState(0);
  const [remain, setRemaining] = useState(0);

  useEffect(() => {
    const sub = gameStore.state.timer.subscribe((value) => setSeconds(value));
    const sub2 = gameStore.state.remaining.subscribe((value) =>
      setRemaining(value)
    );

    return () => {
      sub.unsubscribe();
      sub2.unsubscribe();
    };
  }, []);

  return (
    <CenterPane justifyContent="space-between">
      <Counter count={remain} />
      <IconButton
        appearance="minimal"
        icon={icon[gameStore.state.status]}
        onClick={() => {
          gameStore.state.reset();
          boardStore.reset();
        }}
      />
      <Counter count={seconds} />
    </CenterPane>
  );
});
