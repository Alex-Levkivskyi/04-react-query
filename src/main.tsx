import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize/modern-normalize.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./components/App/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
