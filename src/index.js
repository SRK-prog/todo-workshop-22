import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import reducers from "./reducers";

function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("tododata", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}



const loggerMiddleware = createLogger();

const store = createStore(reducers, applyMiddleware(loggerMiddleware));

store.subscribe(() => saveToLocalStorage(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
