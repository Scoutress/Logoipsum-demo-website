const Routes = {
  homePage: {
    link: "/",
    name: "Home",
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
