import React, { FunctionComponent } from "react";
import { Subscribe } from "@react-rxjs/core";
import { Game } from "../components";
import { Loading } from "../common";

import "./text.css";

export const App: FunctionComponent = () => {
  return (
    <Subscribe>
      <React.Suspense fallback={<Loading />}>
        <Game />
      </React.Suspense>
    </Subscribe>
  );
};
