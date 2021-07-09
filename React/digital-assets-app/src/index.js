import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/AuthContext/auth-context-provider";
import { AppContextProvider } from "./store/AppContext/app-context-provider";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <AuthContextProvider>
    <AppContextProvider>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </AppContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
