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
  detailsPage: {
    link: "/details/:id",
    name: "Details",
  },
  bookingsPage: {
    link: "/bookings",
    name: "My Bookings",
  },
  accountPage: {
    link: "/account",
    name: "My Account",
  },
};

export default Routes;
