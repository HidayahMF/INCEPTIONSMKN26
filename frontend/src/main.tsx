import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AOSInitializer } from "./components/public/AOSInitializer";
import "aos/dist/aos.css";
import "@fontsource-variable/inter";
import "./styles/tokens.css";
import "./styles/app.css";
import "./styles/aos-failsafe.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><AOSInitializer /><App /></React.StrictMode>,
);
