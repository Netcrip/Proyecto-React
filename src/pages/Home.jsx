import Sidebar from "../components/Sidebar";
import BannerHome from "../components/BannerHome";

const Home = () => {
  return (
    <div className="col-1">
      <main className="flex flex-col items-center">
        <BannerHome />
      </main>
      <Sidebar />
    </div>
  );
};

export default Home;
