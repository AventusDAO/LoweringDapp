import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
    return new Web3Provider(provider);
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <App />
    </Web3ReactProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
