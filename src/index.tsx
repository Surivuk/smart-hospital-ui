import axios from "axios";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./index.css";
import { store } from "./store";

(async () => (await axios.get("/settings.json")).data)().then((env: any) => {
  ReactDOM.render(
    <Provider store={store(env)}>
      <SnackbarProvider maxSnack={10} preventDuplicate={false}>
        <React.StrictMode>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </React.StrictMode>
      </SnackbarProvider>
    </Provider>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
