import React, { FunctionComponent } from "react";
import { IconButton, Pane, Heading, VirusIcon, BlankIcon } from "evergreen-ui";
import { FIELD, FieldType } from "../../types";
import { useRootStore } from "../../stores";
import { EventHelper } from "../../utils";
import { withType } from "../../state";

interface Props extends FieldType {
  uid: string;
}

const FieldComponent: FunctionComponent<Props> = ({ uid, ...field }: Props) => {
  const { exposed, adjacent, type } = field;
  const { boardStore, gameStore } = useRootStore();

  return (
    <Pane
      width={boardStore.size}
      height={boardStore.size}
      background="tint2"
      border="muted"
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
            EventHelper.expose(gameStore, uid, field);
          }}
        />
      )}
    </Pane>
  );
};

export const Field = withType(FieldComponent as any);
