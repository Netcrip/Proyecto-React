import GalleryOffer from "../components/GalleryOffer";
import Sidebar from "../components/Sidebar";

const Products = () => {
  return (
    <>
      <title>Ofertas | Mi E-commerce</title>
      <meta name="description" content="Descubre nuestras increíbles ofertas" />

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <GalleryOffer />
        </main>
        <Sidebar />
      </div>
    </>
  );
};

export default Products;
