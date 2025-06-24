import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <title>Perfil de Usuario | Mi E-commerce</title>
      <meta
        name="description"
        content="Gestiona tu perfil de usuario y revisa tu historial de pedidos"
      />
      <meta name="robots" content="noindex, nofollow" />

      <div className="min-h-screen mt-30 bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>
            {user && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    Información Personal
                  </h2>
                  <p>Nombre: {user.name}</p>
                  <p>Email: {user.email}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    Historial de Pedidos
                  </h2>
                  <p>No hay pedidos recientes.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
