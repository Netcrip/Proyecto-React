import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { productService } from "../services/productsService";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState(["all"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        const uniqueCategories = [
          "all",
          ...new Set(data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
        setError(null);
      } catch (err) {
        const status = err?.response?.status;
        const message =
          status === 404
            ? "No se encontraron productos en el servidor."
            : err?.response?.data?.message ||
              err?.message ||
              "Error inesperado.";

        console.error("Error al cargar productos:", message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;

    const searchLower = searchTerm.toLowerCase();
    const searchMatch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower);

    return categoryMatch && searchMatch;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <div className="container mx-auto mt-24 py-8">
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-6">Productos Destacados</h2>
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
      <div className="mb-6">
        <div className="mb-4">
          <div className="md:hidden relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full p-2 pl-3 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "Todas las categorías" : category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div className="hidden md:flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full capitalize text-sm ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {category === "all" ? "Todas" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {(searchTerm || selectedCategory !== "all") && (
        <p className="text-sm text-gray-500 mb-4">
          Mostrando {filteredProducts.length} de {products.length} productos
          {searchTerm && ` para "${searchTerm}"`}
          {selectedCategory !== "all" && ` en categoría "${selectedCategory}"`}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length > productsPerPage && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:bg-blue-100"
            }`}
          >
            <FaChevronLeft size={20} />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-10 h-10 rounded-full ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:bg-blue-100"
            }`}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron productos
          {searchTerm && ` que coincidan con "${searchTerm}"`}
          {selectedCategory !== "all" &&
            ` en la categoría "${selectedCategory}"`}
        </div>
      )}
    </div>
  );
};

export default Gallery;
