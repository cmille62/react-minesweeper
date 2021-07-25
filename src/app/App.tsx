import React, { FunctionComponent } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { HomePage, GameplayPage } from "../components";
import { Routes } from "../utils";

import "./App.scss";

export const App: FunctionComponent = () => {
  return (
    <Switch>
      <Route
        exact
        path={Routes.Base.path}
        render={() => <Redirect to={Routes.BaseRoute.path} />}
      />
      <Route {...Routes.Home} component={HomePage} />
      <Route {...Routes.Gameplay} component={GameplayPage} />

      <Route render={() => <Redirect to={Routes.Home.path} />} />
    </Switch>
  );
};

export default App;
