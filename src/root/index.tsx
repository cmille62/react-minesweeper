import React, { FunctionComponent } from "react";
import { Subscribe } from "@react-rxjs/core";
import { Game } from "../components";

export const App: FunctionComponent = () => {
  return (
    <Subscribe>
      <React.Suspense fallback={<p>wait</p>}>
        <Game />
      </React.Suspense>
    </Subscribe>
  );
};
