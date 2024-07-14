import HomeAnnouncement from "./home-announcement/HomeAnnouncement.jsx";
import HomeCategories from "./home-categories/HomeCategories.jsx";
import HomePopular from "./home-popular/HomePopular.jsx";

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
