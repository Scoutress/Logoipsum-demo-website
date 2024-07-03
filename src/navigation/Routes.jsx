export const routes = {
  homePage: {
    link: "/",
    name: "Home",
  },
  servicesPage: {
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
  categoryPage: {
    link: "/category/:name",
    name: "Category",
  },
};
