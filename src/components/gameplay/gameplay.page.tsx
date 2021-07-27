import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Pane } from "evergreen-ui";
import { BoardQueryType } from "../../types";
import { useRootStore } from "../../stores";
import { InitHelper, parseBoardQuery } from "../../utils";

import { Board } from "./board.component";
import { GameHead } from "./head.component";
import { CenterPane } from "../../common";

type Props = RouteComponentProps<BoardQueryType>;

export const GameplayPage: FunctionComponent<Props> = (props: Props) => {
  const { boardStore, gameStore } = useRootStore();

  useEffect(() => {
    const p = parseBoardQuery(props.match.params);
    boardStore.initialize(p);
    gameStore.state.initialize(
      InitHelper.generateBoard(p),
      p.mines,
      InitHelper.countEmpty(p)
    );
  }, [props.match]);

  return (
    <CenterPane alignContent="center" justifyContent="center" width="100%">
      <Pane
        minWidth={450}
        minHeight={450}
        display="inline-flex"
        flexDirection="column"
      >
        <GameHead />
        <Board />
      </Pane>
    </CenterPane>
  );
};
