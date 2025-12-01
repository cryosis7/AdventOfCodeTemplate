import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.js";
import { Provider } from "jotai";

const rootEl = document.getElementById("root");
if (rootEl !== null) {
  const root = createRoot(rootEl);
  root.render(
    <Provider>
      <App />
    </Provider>
  );
}
