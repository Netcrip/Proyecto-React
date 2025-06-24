import Gallery from "../components/Gallery";
import Sidebar from "../components/Sidebar";

const Products = () => {
  return (
    <>
      <title>Productos | Mi E-commerce</title>
      <meta
        name="description"
        content="Explora nuestra colección de productos"
      />

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Gallery />
        </main>
        <Sidebar />
      </div>
    </>
  );
};

export default Products;
