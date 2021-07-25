import React, { FunctionComponent } from "react";
import { Badge, Pane } from "evergreen-ui";

interface Props {
  count: number;
}

export const Counter: FunctionComponent<Props> = ({ count }: Props) => {
  return (
    <Pane>
      <Badge>{count}</Badge>
    </Pane>
  );
};
