import HomeAnnouncement from "./home-announcement/HomeAnnouncement";
import HomeCategories from "./home-categories/HomeCategories";
import HomePopular from "./home-popular/HomePopular";

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

