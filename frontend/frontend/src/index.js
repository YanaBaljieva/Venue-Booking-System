import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(

    <BrowserRouter>
        <App />
      </BrowserRouter>,

);


reportWebVitals();