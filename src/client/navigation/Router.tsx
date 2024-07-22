import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page/ErrorPage.tsx";
import Home from "../pages/home/Home.tsx";
import Services from "../pages/services/Services.tsx";
import About from "../pages/about/About.tsx";
import Routes from "./Routes.tsx";
import Root from "./Root.tsx";
import SearchPage from "../pages/search/SearchPage.tsx";
import Details from "../pages/details/Details.tsx";

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
      {
        path: Routes.detailsPage.link,
        element: <Details />,
      },
    ],
  },
]);

export default Router;
