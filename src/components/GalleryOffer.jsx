import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { productService } from "../services/productsService";

const GalleryOffer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.discount >= 15.0
  );

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">Ofertas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="animate-pulse">
                <div className="bg-gray-200 h-48 w-full"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-24 py-8">
        <div className="mb-6">
          <div className="mb-4">
        <div className="text-center py-8 text-red-500">
          Error al cargar productos: {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Reintentar
          </button>
          </div>
          </div>
        </div>
      </div>
    );
  } 

  return (
    <div className="container mx-auto mt-24 py-8">
      <h2 className="text-2xl font-bold mb-6">Ofertas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">No hay Ofertas.</div>
      )}
    </div>
  );
};

export default GalleryOffer;
