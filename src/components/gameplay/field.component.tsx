import React, { FunctionComponent } from "react";
import { IconButton, Pane, Heading, VirusIcon, BlankIcon } from "evergreen-ui";
import { FIELD, FieldType } from "../../types";
import { useRootStore } from "../../stores";
import { EventHelper, PathHelper } from "../../utils";
import { withType } from "../../state";

interface Props extends FieldType {
  uid: string;
  x: number;
  y: number;
}

const FieldComponent: FunctionComponent<Props> = ({
  uid,
  x,
  y,
  ...field
}: Props) => {
  const { exposed, adjacent, type } = field;
  const { boardStore, gameStore } = useRootStore();

  return (
    <Pane
      width={boardStore.size}
      height={boardStore.size}
      background="tint2"
      border="muted"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {exposed ? (
        type === FIELD.Mine ? (
          <IconButton disabled={true} icon={VirusIcon} />
        ) : (
          <Heading>{adjacent || ""}</Heading>
        )
      ) : (
        <IconButton
          icon={BlankIcon}
          onClick={() => {
            // EventHelper.expose(gameStore, uid, field);
            PathHelper.traverse(gameStore.state, x, y);
          }}
        />
      )}
    </Pane>
  );
};

export const Field = withType(FieldComponent as any);
