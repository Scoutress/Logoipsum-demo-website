import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.jsx";
import Home from "../pages/home/Home.jsx";
import Services from "../pages/services/Services.jsx";
import About from "../pages/About.jsx";
import Routes from "./Routes.jsx";
import Root from "./Root.js";
import SearchPage from "../pages/search/SearchPage.jsx";

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
