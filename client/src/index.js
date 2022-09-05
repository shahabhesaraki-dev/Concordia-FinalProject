import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { AllContextProvider } from "./components/Context/allContext";

ReactDOM.render(
  <React.StrictMode>
    <AllContextProvider>
      <App />
    </AllContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
