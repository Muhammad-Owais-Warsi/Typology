import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import App from "./App.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <KindeProvider
      clientId="b439cba08eab4b878ddd63c3426aefa5"
      domain="https://chimptype.kinde.com"
      redirectUri="http://localhost:5173/find"
      logoutUri="http://localhost:5173/"
    >
      <App />
    </KindeProvider>
  </StrictMode>,
);
