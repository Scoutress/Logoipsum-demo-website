import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Services from "../pages/Services";
import About from "../pages/About";
import Categories from "../pages/categories/Categories";
import { routes } from "./Routes";
import { Root } from "./Root";

export const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.homePage.link,
        element: <Home />,
      },
      {
        path: routes.servicesPage.link,
        element: <Services />,
      },
      {
        path: routes.aboutPage.link,
        element: <About />,
      },
      {
        path: routes.categoryPage.link,
        element: <Categories />,
      },
    ],
  },
]);
