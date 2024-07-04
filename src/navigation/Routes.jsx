const Routes = {
  homePage: {
    link: "/",
    name: "Home",
  },
  searchPage: {
    link: "/search",
    name: "Search",
  },
  servicesPage: {
    link: "/category/:category",
    name: "Services",
  },
  allServicesPage: {
    link: "/services",
    name: "Services",
  },
  aboutPage: {
    link: "/about",
    name: "About",
  },
  errorPage: {
    link: "/*",
    name: "404",
  },
};

export default Routes;
