import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const userData = {
        id: "1",
        name: "Usuario Demo",
        email,
        isAdmin: email === "admin@example.com",
      };
      login(userData);
      toast.success(isLogin ? "Inicio de sesión exitoso" : "Registro exitoso",  {duration: 4000,position: "top-center"});
      navigate("/");
    } else {
      toast.error("Por favor completa todos los campos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email : admin@example.com
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña :
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-700 font-bold"
          >
            {isLogin ? "Regístrate" : "Inicia Sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
