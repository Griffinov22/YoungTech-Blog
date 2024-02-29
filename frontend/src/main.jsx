import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth/authConfig";
import { MsalProvider } from "@azure/msal-react";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/styles.css";

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }
});

msalInstance.enableAccountStorageEvents();

msalInstance.addEventCallback((event) => {
  // TESTING
  // console.log("event = ", event.eventType, " -- ", event.type == EventType.LOGIN_SUCCESS);
  //
  if (
    event.eventType === EventType.LOGIN_SUCCESS ||
    event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
    event.eventType === EventType.SSO_SILENT_SUCCESS
  ) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
