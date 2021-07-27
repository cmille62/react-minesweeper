import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IconButton, Pane, RandomIcon } from "evergreen-ui";
import { BoardQueryType } from "../../types";
import { useRootStore } from "../../stores";
import {
  InitHelper,
  parseBoardQuery,
  Routes,
  structureRoute,
} from "../../utils";

import { Board } from "./board.component";
import { GameHead } from "./head.component";
import { CenterPane, ControlsPane } from "../../common";
import { nanoid } from "nanoid";

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
        <ControlsPane>
          <IconButton
            icon={RandomIcon}
            is="a"
            href={structureRoute(Routes.Gameplay, {
              ...props.match.params,
              uid: nanoid(),
            })}
          />
        </ControlsPane>
      </Pane>
    </CenterPane>
  );
};
