import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth/authConfig";
import { MsalProvider } from "@azure/msal-react";

import "bootstrap/dist/css/bootstrap.css";
import "./css/old-styles.css";

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
