import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "tippy.js/animations/scale.css";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeContextWrapper from "./components/Theme/ThemeContextWrapper";

// TODO Turn On Dark Mode
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ThemeContextWrapper>
        <Router>
            <App />
        </Router>
    </ThemeContextWrapper>
);
