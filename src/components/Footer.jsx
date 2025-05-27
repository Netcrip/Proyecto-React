const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-23">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mi E-commerce®</h3>
            <p>La mejor tienda en línea para tus compras.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-300">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-gray-300">
                  Productos
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <p>Email: info@miecommerce.com</p>
            <p>Teléfono: +54 9 XXXX-XXXX</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Mi E-commerce®. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
