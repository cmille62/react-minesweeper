import React, { FunctionComponent } from "react";
import { Button, Pane } from "evergreen-ui";
import { Routes } from "../../utils";

export const HomePage: FunctionComponent = () => {
  return (
    <Pane>
      <Button is="a" href={Routes.Gameplay.path}>
        Play
      </Button>
    </Pane>
  );
};
