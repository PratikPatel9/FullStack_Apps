import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#003459",
          colorBorder:"#003459"
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
