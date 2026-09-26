import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/tokens.css";
import "./styles/app.css";

const blankRoutes = new Set([
  "/profile",
  "/majors",
  "/programs",
  "/news",
  "/contact",
  "/blud",
  "/achievements",
  "/information",
]);
const page = blankRoutes.has(window.location.pathname) ? (
  <main aria-hidden="true" />
) : (
  <App />
);
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{page}</React.StrictMode>,
);
