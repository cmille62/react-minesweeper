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
import { actions } from "../../state";
import { GameStatus } from "../../types";

const icon = {
  initial: EmojiIcon,
  win: ThumbsUpIcon,
  good: EmojiIcon,
  failure: ThumbsDownIcon,
  reset: ResetIcon,
};

export const GameHead: FunctionComponent = observer(() => {
  const { gameStore } = useRootStore();
  const [seconds, setSeconds] = useState(0);
  const [remain, setRemaining] = useState(0);
  const [status, setStatus] = useState<GameStatus>();

  useEffect(() => {
    const sub = gameStore.state.timer.observable$.subscribe((value) =>
      setSeconds(value)
    );
    const sub2 = gameStore.events.subscribe(({ type, payload }) => {
      switch (type) {
        case actions.UPDATE_REMAINING: {
          setRemaining(payload as number);
          break;
        }
        case actions.UPDATE_STATUS: {
          setStatus(payload as GameStatus);
          break;
        }
      }
    });

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
        icon={status ? icon[status] : icon.initial}
        onClick={() => {
          setSeconds(0);
          gameStore.state.reset();
        }}
      />
      <Counter count={seconds} />
    </CenterPane>
  );
});
