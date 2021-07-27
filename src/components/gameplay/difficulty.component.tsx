import React, { FunctionComponent, useState } from "react";
import { Link, Pane, Tooltip } from "evergreen-ui";
import { startCase } from "lodash";
import { Routes, structureRoute } from "../../utils";
import { nanoid } from "nanoid";

interface OptionsType extends Record<string, any> {
  value: string;
  background: string;
  muted: string;
  width: number;
  height: number;
  mines: number;
}

const options: OptionsType[] = [
  {
    value: "easy",
    background: "green500",
    muted: "green300",
    width: 10,
    height: 10,
    mines: 10,
  },
  {
    value: "medium",
    background: "blue500",
    muted: "blue100",
    width: 20,
    height: 15,
    mines: 30,
  },
  {
    value: "hard",
    background: "orange500",
    muted: "orange100",
    width: 30,
    height: 20,
    mines: 75,
  },
  {
    value: "extreme",
    background: "red500",
    muted: "red300",
    width: 30,
    height: 20,
    mines: 150,
  },
];

export const Difficulty: FunctionComponent = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <Pane display="flex">
      {options.map(({ value, background, muted, ...props }) => (
        <Tooltip key={value} content={startCase(value)}>
          <Link
            href={structureRoute(Routes.Gameplay, { uid: nanoid(), ...props })}
          >
            <Pane
              width={16}
              height={32}
              background={selected === value ? background : muted}
              onClick={() => setSelected(value)}
            />
          </Link>
        </Tooltip>
      ))}
    </Pane>
  );
};
