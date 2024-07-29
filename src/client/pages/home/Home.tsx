import React from "react";
import HomeAnnouncement from "./home-announcement/HomeAnnouncement.tsx";
import HomeCategories from "./home-categories/HomeCategories.tsx";
import HomePopular from "./home-popular/HomePopular.tsx";

const Home = () => {
  return (
    <div>
      <HomeAnnouncement />
      <HomeCategories />
      <HomePopular />
    </div>
  );
};

export default Home;
