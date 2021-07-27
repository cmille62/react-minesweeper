import React, { FunctionComponent } from "react";
import { Pane } from "evergreen-ui";
import { DivProps } from "../../types";

interface Props extends DivProps {
  children: React.ReactNode;
}

export const ControlsPane: FunctionComponent<Props> = ({
  children,
  ...props
}: Props) => {
  return (
    <Pane
      display="flex"
      alignContent="center"
      justifyContent="space-between"
      {...props}
    >
      {children}
    </Pane>
  );
};
