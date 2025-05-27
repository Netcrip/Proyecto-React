import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { toggleSidebar, cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Mi E-Commerce®
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile" className="hover:text-gray-300">
                Perfil
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="hover:text-gray-300">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="hover:text-gray-300">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">
              Iniciar Sesión
            </Link>
          )}
          <button onClick={toggleSidebar} className="relative">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;