import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-gray-700 text-white p-4">
      <div className="container mx-auto flex gap-6">
        <Link to="/" className="hover:text-gray-300">
          Inicio
        </Link>
        <Link to="/products" className="hover:text-gray-300">
          Productos
        </Link>
        <Link to="/offer" className="hover:text-gray-300">
          Ofertas
        </Link>
        <Link to="/contact" className="hover:text-gray-300">
          Contacto
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
