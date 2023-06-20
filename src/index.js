import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <StrictMode>
        <ReduxProvider store={store}>
            <BrowserRouter>
                <ChakraProvider theme={theme}>
                    <ColorModeScript />
                    <App />
                </ChakraProvider>
            </BrowserRouter>
        </ReduxProvider>
    </StrictMode>
);
