import React, { FunctionComponent } from "react";

import { styles } from "./svg.css";

import { ReactComponent as FlagSvg } from "./flag.svg";
import { ReactComponent as BombSvg } from "./virus.svg";

export const FlagIcon: FunctionComponent = () => <FlagSvg className={styles} />;
export const BombIcon: FunctionComponent = () => <BombSvg className={styles} />;
