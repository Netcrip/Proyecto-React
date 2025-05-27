import Gallery from "../components/Gallery";
import Sidebar from "../components/Sidebar";

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Gallery />
      </main>
      <Sidebar />
    </div>
  );
};

export default Products;
