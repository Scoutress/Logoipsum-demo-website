import { RouterProvider } from "react-router-dom";
import Router from "./navigation/router/Router.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./utils/I18n.ts";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
    </QueryClientProvider>
  );
};

export default App;
