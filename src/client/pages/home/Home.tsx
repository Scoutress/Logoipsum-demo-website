import HomeAnnouncement from "./home-announcement/HomeAnnouncement.js";
import HomeCategories from "./home-categories/HomeCategories.js";
import HomePopular from "./home-popular/HomePopular.js";

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
