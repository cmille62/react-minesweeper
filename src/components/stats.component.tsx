import React, { FunctionComponent } from "react";
import { useGameStats } from "../stream";

export const GameStats: FunctionComponent = () => {
  const {
    total,
    revealed,
    unrevealed,
    percentageFlagged,
    percentageUncovered,
  } = useGameStats();

  return (
    <ul>
      <li>Total items: {total}</li>
      <li>Items completed: {revealed}</li>
      <li>Items not completed: {unrevealed}</li>
      <li>Percent completed: {percentageUncovered}</li>
      <li>Percent flagged: {percentageFlagged}</li>
    </ul>
  );
};
