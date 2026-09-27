import React from "react";
import { createRoot } from "react-dom/client";
import AOS from "aos";
import { App } from "./App";
import "@fontsource-variable/inter";
import "aos/dist/aos.css";
import "./styles/tokens.css";
import "./styles/app.css";

AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
  disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

requestAnimationFrame(() => AOS.refresh());

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>,
);
