import React, { FunctionComponent } from "react";
import { IconButton, EmojiIcon, IssueIcon, ResetIcon } from "evergreen-ui";
import { useRootStore } from "../../stores";
import { CenterPane, Counter } from "../../common";
import { observer } from "mobx-react";

const icon = {
  good: EmojiIcon,
  failure: IssueIcon,
  reset: ResetIcon,
};

export const GameHead: FunctionComponent = observer(() => {
  const { boardStore, timerStore } = useRootStore();
  return (
    <CenterPane>
      <Counter count={99} />
      <IconButton appearance="minimal" icon={icon[boardStore.status]} />
      <Counter count={timerStore.seconds} />
    </CenterPane>
  );
});
