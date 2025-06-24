import Sidebar from "../components/Sidebar";
import BannerHome from "../components/BannerHome";

const Home = () => {
  return (
    <>
      <title>Inicio | Mi E-commerce</title>
      <meta
        name="description"
        content="Bienvenido a nuestra tienda en línea con los mejores productos premium"
      />
      <meta
        name="keywords"
        content="inicio, ecommerce, tienda online, compras,premium"
      />

      <div className="col-1">
        <main className="flex flex-col items-center">
          <BannerHome />
        </main>
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
