import React, { FunctionComponent } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { GameplayPage } from "../components";
import { Routes, structureRoute } from "../utils";

import "./App.scss";

const url = structureRoute(Routes.Gameplay, {
  width: 20,
  height: 20,
  mines: 25,
  uid: "",
});

export const App: FunctionComponent = () => {
  return (
    <Switch>
      <Route
        exact
        path={Routes.Base.path}
        render={() => <Redirect to={url} />}
      />
      <Route {...Routes.Gameplay} component={GameplayPage} />

      <Route render={() => <Redirect to={url} />} />
    </Switch>
  );
};

export default App;
