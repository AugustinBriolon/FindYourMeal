import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Theme>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Theme>
  </React.StrictMode>
);