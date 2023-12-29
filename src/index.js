import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import App from "./App";
import QuizProvider from "./contexts/QuizContext/QuizProvider";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </StrictMode>
);
