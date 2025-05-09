import { StackClientApp } from "@stackframe/react";
import { useNavigate } from "react-router-dom";

export const stackClientApp = new StackClientApp({
  
  projectId: "",
  publishableClientKey: "",
  tokenStore: "cookie",
  redirectMethod: {
    useNavigate,
  }
});
