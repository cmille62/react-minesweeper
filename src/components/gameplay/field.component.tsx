import React, { FunctionComponent } from "react";
import {
  IconButton,
  Pane,
  Heading,
  VirusIcon,
  BlankIcon,
  RigIcon,
} from "evergreen-ui";
import { FIELD, FieldType } from "../../types";
import { useRootStore } from "../../stores";
import { EventHelper, PathHelper } from "../../utils";
import { withType } from "../../state";

interface Props extends FieldType {
  uid: string;
  x: number;
  y: number;

  disabled: boolean;
  initial: boolean;
}

function color(proximity: number) {
  switch (proximity) {
    case 1:
      return "#3366FF";
    case 2:
      return "#52BD95";
    case 3:
    case 4:
      return "#D14343";
    case 5:
    case 6:
      return "#A73636";
    case 7:
    case 8:
    case 9:
      return "#7D2828";
    default:
      return `red${proximity}00`;
  }
}

const FieldComponent: FunctionComponent<Props> = ({
  uid,
  x,
  y,
  disabled,
  initial,
  ...field
}: Props) => {
  const { exposed, adjacent, type, flagged } = field;
  const { boardStore, gameStore, timerStore } = useRootStore();
  const mine = type === FIELD.Mine;

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
        mine ? (
          <IconButton disabled={true} icon={VirusIcon} />
        ) : (
          <Heading color={color(adjacent)}>{adjacent || ""}</Heading>
        )
      ) : (
        <IconButton
          icon={flagged ? RigIcon : BlankIcon}
          disabled={disabled}
          onClick={() => {
            if (initial) {
              timerStore.start();
            }
            if (flagged) {
              EventHelper.flag(gameStore.state, uid, field);
            } else {
              PathHelper.traverse(gameStore.state, x, y);
              if (mine) {
                boardStore.fail();
              }
            }
          }}
          onContextMenu={(e: any) => {
            e.preventDefault();
            EventHelper.flag(gameStore.state, uid, field);
          }}
        />
      )}
    </Pane>
  );
};

export const Field = withType(FieldComponent as any);
