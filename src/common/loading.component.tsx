import React, { FunctionComponent } from "react";
import { Pane, Spinner } from "evergreen-ui";
import { DivProps } from "../types";

export const Loading: FunctionComponent<DivProps> = ({
  ...props
}: DivProps) => {
  return (
    <Pane display="flex" alignItems="center" {...props}>
      <Spinner size={16} />
    </Pane>
  );
};
