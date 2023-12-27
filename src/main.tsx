import * as ReactDOM from "react-dom/client";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Theme>
    <App />
  </Theme>
);