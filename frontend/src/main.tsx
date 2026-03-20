import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import { RouterProvider } from "react-router";
import { ConfigProvider, App as AntApp } from "antd";
import { antdTheme } from "./app/theme/antd-theme";
import { router } from "./app/routes";
import { ErrorBoundary } from "./app/components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <ConfigProvider theme={antdTheme}>
          <AntApp>
            <RouterProvider router={router} />
          </AntApp>
        </ConfigProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

