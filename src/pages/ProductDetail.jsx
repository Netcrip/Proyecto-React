import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../services/productsService";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import Sidebar from "../components/Sidebar";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto mt-24 py-8">
        <div className="animate-pulse bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="bg-gray-200 h-96 rounded-lg"></div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-8 text-red-500">
          Error al cargar el producto: {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto mt-24 py-8">
        <div className="text-center py-8">Producto no encontrado</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-30 py-8">
       <button
        onClick={() => navigate(-1)} 
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Volver a productos
      </button>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-h-96 object-contain rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{product.brand}</p>

            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-xl">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span className="text-gray-500 ml-2">({product.rating})</span>
            </div>
            <div className="mb-6">
              {product.discount > 0 ? (
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-red-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Descripción</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Disponibilidad</h3>
              {product.stock > 0 ? (
                <span className="text-green-600">
                  En stock ({product.stock} unidades)
                </span>
              ) : (
                <span className="text-red-600">Agotado</span>
              )}
            </div>
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className={`px-6 py-3 rounded-lg text-lg font-medium ${
                product.stock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
            </button>
            
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default ProductDetail;
