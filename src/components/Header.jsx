import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-hot-toast";

const Header = () => {
  const { toggleSidebar, cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <div className="w-full flex justify-between items-center px-4 md:px-8">
        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
          Mi E-Commerce®
        </Link>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden md:flex items-center space-x-6">
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
               <button
                onClick={async () => {
                  await logout();
                  setMenuOpen(false);
                  toast.success("Sesión cerrada", {
                    duration: 4000,
                    position: "top-center",
                  });
                }}
                className="block hover:text-gray-300"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">
              Iniciar Sesión
            </Link>
          )}
          <button onClick={toggleSidebar} className="relative text-2xl">
            <FiShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 px-4 space-y-2">
          {user ? (
            <>
              <Link
                to="/profile"
                className="block hover:text-gray-300"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Perfil
              </Link>
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="block hover:text-gray-300"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={async () => {
                  await logout();
                  setMenuOpen(false);
                  toast.success("Sesión cerrada", {
                    duration: 4000,
                    position: "top-center",
                  });
                }}
                className="block hover:text-gray-300"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block hover:text-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Iniciar Sesión
            </Link>
          )}
          <button onClick={toggleSidebar} className="relative text-2xl block">
            <FiShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
