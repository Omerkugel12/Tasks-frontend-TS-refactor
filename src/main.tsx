import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.js";
import { ModalProvider } from "./contexts/ModalContext.js";
import { LoggedInUserTasksProvider } from "./contexts/loggedInUserTasksContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <AuthProvider>
          <LoggedInUserTasksProvider>
            {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
            <App />
            {/* </ThemeProvider> */}
          </LoggedInUserTasksProvider>
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
