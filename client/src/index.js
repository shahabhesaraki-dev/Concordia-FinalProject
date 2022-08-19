import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AllContextProvider } from "./components/Context/allContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AllContextProvider>
      <App />
    </AllContextProvider>
  </React.StrictMode>
);
