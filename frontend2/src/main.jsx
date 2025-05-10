import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import App from "./App.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <KindeProvider
      clientId="b439cba08eab4b878ddd63c3426aefa5"
      domain="https://chimptype.kinde.com"
      redirectUri="http://localhost:5173/find"
      logoutUri="http://localhost:5173/"
    >
      <App />
    </KindeProvider>
  // </StrictMode>,
);


// api keys
// VITE_SUPABASE_URL = "https://ineqoiiiifjfukkgxkqt.supabase.co"
// VITE_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZXFvaWlpaWZqZnVra2d4a3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzkyNjUsImV4cCI6MjA2MjQ1NTI2NX0.RQGERBZtBWpI26szdcFapNgNtGitETpNlalQrDMLQ5A"
