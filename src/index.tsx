import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { SceneProvider } from "./context/Scene";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <SceneProvider>{<App />}</SceneProvider>
  </React.StrictMode>
);

reportWebVitals();
