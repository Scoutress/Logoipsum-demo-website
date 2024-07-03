import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/Router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
