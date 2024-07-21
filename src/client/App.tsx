import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./navigation/Router.js";

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
