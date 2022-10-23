import React, { FunctionComponent } from "react";
import { borderStyles } from "../../common";
import { useGameStats } from "../../stream";

import { FlagIcon } from "../../assets";

export const GameStats: FunctionComponent = () => {
  const { total, revealed, percentageFlagged } = useGameStats();

  return (
    <div className={borderStyles}>
      {revealed}/{total}
      <div>
        <FlagIcon /> {percentageFlagged}
      </div>
    </div>
  );
};
