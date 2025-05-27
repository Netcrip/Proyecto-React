import GalleryOffer from "../components/GalleryOffer";
import Sidebar from "../components/Sidebar";

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <GalleryOffer />
      </main>
      <Sidebar />
    </div>
  );
};

export default Products;
