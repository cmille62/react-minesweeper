import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { Router } from "react-router";
import { RootStore } from "./stores";
import { App } from "./app/App";

import reportWebVitals from "./reportWebVitals";

const rootStore = new RootStore();

ReactDOM.render(
  <Provider {...rootStore.getProviderStores()}>
    <Router history={rootStore.history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
