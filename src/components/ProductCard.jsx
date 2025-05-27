import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/product/${product.id}`} className="hover:text-blue-600">
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          </Link>
          <p className="text-gray-600 mb-2">{product.brand}</p>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              ({product.rating})
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {product.stock > 0 ? (
              <span className="text-green-600">En stock ({product.stock})</span>
            ) : (
              <span className="text-red-600">Agotado</span>
            )}
          </div>
        </div>
        <button
          onClick={() => addToCart(product)}
          className={`mt-4 px-4 py-2 rounded w-full ${
            product.stock > 0
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Añadir al carrito" : "Sin stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
