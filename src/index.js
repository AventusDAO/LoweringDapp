import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Router>
        <App />
    </Router>
);
