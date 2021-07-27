import React, { FunctionComponent, useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  Pane,
  SettingsIcon,
  TextInputField,
} from "evergreen-ui";
import { nanoid } from "nanoid";
import { BoardParsedType } from "../../types";
import { structureRoute, Routes } from "../../utils";

const settings: {
  type?: string;
  label: string;
  key: "width" | "height" | "mines" | "uid";
}[] = [
  {
    type: "number",
    label: "Width",
    key: "width",
  },
  {
    type: "number",
    label: "Height",
    key: "height",
  },
  {
    type: "number",
    label: "Mines",
    key: "mines",
  },
  {
    label: "Key",
    key: "uid",
  },
];

export const Settings: FunctionComponent = () => {
  const [show, setShown] = useState(false);
  const [payload, setPayload] = useState<BoardParsedType>({
    width: 30,
    height: 20,
    mines: 30,
    uid: nanoid(),
  });
  return (
    <Pane>
      <Dialog title="Custom Game" isShown={show} hasFooter={false}>
        <Pane>
          {settings.map(({ key, ...props }) => (
            <TextInputField
              key={key}
              value={payload[key] || ""}
              {...props}
              onBlur={({
                target: { value },
              }: React.ChangeEvent<HTMLInputElement>) => {
                setPayload({ ...payload, [key]: value });
              }}
            />
          ))}
          <Button is="a" href={structureRoute(Routes.Gameplay, payload as any)}>
            New Game
          </Button>
        </Pane>
      </Dialog>

      <IconButton icon={SettingsIcon} onClick={() => setShown(!show)} />
    </Pane>
  );
};
