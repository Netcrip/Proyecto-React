import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-gray-700 text-white p-4">
      <div className="container mx-auto flex gap-6">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `hover:text-gray-300 ${isActive ? "text-yellow-400 font-bold" : ""}`
          }
          end
        >
          Inicio
        </NavLink>
        <NavLink 
          to="/products" 
          className={({ isActive }) => 
            `hover:text-gray-300 ${isActive ? "text-yellow-400 font-bold" : ""}`
          }
        >
          Productos
        </NavLink>
        <NavLink 
          to="/offer" 
          className={({ isActive }) => 
            `hover:text-gray-300 ${isActive ? "text-yellow-400 font-bold" : ""}`
          }
        >
          Ofertas
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            `hover:text-gray-300 ${isActive ? "text-yellow-400 font-bold" : ""}`
          }
        >
          Contacto
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
