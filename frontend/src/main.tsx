import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AOSInitializer } from "./components/public/AOSInitializer";
import { AuthProvider } from "./features/auth/AuthProvider";
import { ToastProvider } from "./components/shared/ToastProvider";
import "aos/dist/aos.css";
import "@fontsource-variable/inter";
import "./styles/tokens.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="min-w-0 max-w-full overflow-x-clip">
      <AOSInitializer />
      <AuthProvider><ToastProvider><App /></ToastProvider></AuthProvider>
    </div>
  </React.StrictMode>,
);
