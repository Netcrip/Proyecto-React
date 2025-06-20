import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FiX, FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isSidebarOpen,
    toggleSidebar,
  } = useContext(CartContext);

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast("Producto eliminado del carrito", {
      duration: 4000,
      position: "top-center",
      icon: "⚠️",
    });
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > item.stock) {
      toast.error(
        `No hay suficiente stock ${item.name}. Máximo disponible: ${item.stock}`,
        {
          duration: 4000,
          position: "top-right",
        }
      );
      updateQuantity(item.id, item.stock);
      return;
    }
    if (newQuantity < 1) {
      updateQuantity(item.id, 1);
      return;
    }
    updateQuantity(item.id, newQuantity);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  }, [location, isSidebarOpen, toggleSidebar]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebar();
    }
  };

  
  const handleCheckOut = () => {
    if (!isAuthenticated()) {      
              navigate("/login", { state: { from: "checkout" } });
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }
    try {
      cartItems.forEach((item) => {
        removeFromCart(item.id);
      });
      toast.success("¡Gracias por tu compra!", {
        duration: 4000,
        position: "top-center",
      });
      toggleSidebar();
    } catch (error) {
      toast.error("Ocurrió un error al procesar tu compra", {
        duration: 4000,
        position: "top-center",
      });
      console.error("Error en checkout:", error);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-10 pointer-events-auto z-40"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
        style={{
          touchAction: isSidebarOpen ? "none" : "auto",
          overscrollBehavior: "contain",
        }}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">
              Tu Carrito (
              {cartItems.reduce((total, item) => total + item.quantity, 0)})
            </h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSidebar();
              }}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Cerrar carrito"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Tu carrito está vacío</p>
                <button
                  onClick={toggleSidebar}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-sm line-clamp-1">{item.name}</h3>
                        <p className="ml-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                      <p className="text-xs text-gray-500">
                        Disponibles: {item.stock} | Cantidad:{" "}
                        {Math.min(item.stock, item.quantity)}
                      </p>

                      <div className="flex-1 flex items-end justify-between text-sm mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              handleQuantityChange(item, item.quantity - 1)
                            }
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item, item.quantity + 1)
                            }
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity > item.stock}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white">
              <div className="flex justify-between text-lg font-medium text-gray-900 mb-2">
                <p>Total</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <button
                onClick={handleCheckOut}
                disabled={cartItems.length === 0}
                className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 ${
                  !isAuthenticated() || cartItems.length === 0
                    ? "opacity-80"
                    : ""
                }`}
              >
                {!isAuthenticated()
                  ? "Inicia sesión para comprar"
                  : "Finalizar compra"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
