import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Pane } from "evergreen-ui";
import { Board } from "./board.component";
import { BoardQueryType } from "../../types";
import { useRootStore } from "../../stores";
import { parseBoardQuery } from "../../utils";

type Props = RouteComponentProps<BoardQueryType>;

export const GameplayPage: FunctionComponent<Props> = (props: Props) => {
  const { boardStore } = useRootStore();
  useEffect(() => {
    const p = parseBoardQuery(props.match.params);
    boardStore.initialize(p);
  }, [props.match]);
  return (
    <Pane>
      <Board />
    </Pane>
  );
};
