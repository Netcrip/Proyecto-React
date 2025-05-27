import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Admin = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen mt-30 bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
          {user && (
            <div className="space-y-4">
              <p>Bienvenido, {user.name} (Administrador)</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="font-bold">Usuarios Registrados</h3>
                  <p className="text-2xl">1,234</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="font-bold">Productos</h3>
                  <p className="text-2xl">56</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h3 className="font-bold">Pedidos Hoy</h3>
                  <p className="text-2xl">24</p>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Añadir Producto
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Ver Pedidos
                  </button>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                    Estadísticas
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
