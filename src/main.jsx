
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import planets from "./data/planets.js";
import stories from "./data/stories.js";
import { validateContent } from "./utils/validateContent.js";

if (import.meta.env.DEV) {
  const errors = validateContent(planets, stories);

  if (errors.length > 0) {
    console.error("ORBITX content validation failed:");

    errors.forEach((error) => {
      console.error("❌", error);
    });
  } else {
    console.info("✅ ORBITX content validation passed!");
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
