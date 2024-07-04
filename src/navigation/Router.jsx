import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/home/Home";
import Services from "../pages/services/Services";
import About from "../pages/About";
import Routes from "./Routes";
import Root from "./Root";
import SearchPage from "../pages/search/SearchPage";

const Router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Routes.homePage.link,
        element: <Home />,
      },
      {
        path: Routes.searchPage.link,
        element: <SearchPage />,
      },
      {
        path: Routes.servicesPage.link,
        element: <Services />,
      },
      {
        path: Routes.allServicesPage.link,
        element: <Services />,
      },
      {
        path: Routes.aboutPage.link,
        element: <About />,
      },
    ],
  },
]);

export default Router;
