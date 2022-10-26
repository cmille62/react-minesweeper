import React, { FunctionComponent } from "react";
import { Subscribe } from "@react-rxjs/core";
import { Game } from "../components";
import { Loading } from "../common";

import "./text.css";
import { lightTheme } from "./theme.css";

export const App: FunctionComponent = () => {
  return (
    <div id="app" className={lightTheme}>
      <Subscribe>
        <React.Suspense fallback={<Loading />}>
          <Game />
        </React.Suspense>
      </Subscribe>
    </div>
  );
};
