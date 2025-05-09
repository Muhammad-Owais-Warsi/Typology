import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import FindMatch from "./components/find.jsx";
import Result from "./components/result.jsx";
import LandingPage from "./components/landing.jsx";
import { StackHandler, StackProvider, StackTheme } from "@stackframe/react";
import { stackClientApp } from "./stack.js";

function App() {
  function HandlerRoutes() {
    const location = useLocation();

    return (
      <StackHandler
        app={stackClientApp}
        location={location.pathname}
        fullPage
      />
    );
  }

  return (
    <>
      <BrowserRouter>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="find" element={<FindMatch />} />
              <Route path="/result" element={<Result />} />
               <Route path="/handler/*" element={<HandlerRoutes />} />
            </Routes>
          </StackTheme>
        </StackProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
