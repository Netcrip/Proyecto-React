import React from "react";
import homeImage from "../assets/images/home.jpg";
import { useNavigate } from "react-router-dom";

const BannerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
      <img
        src={homeImage}
        alt=""
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container mx-auto px-6 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-4xl text-stone-700">
            Descubre Nuestra Colección
          </h2>
          <p className="text-xl mb-8 drop-shadow-4xl max-w-lg text-zinc-700">
            Productos premium al mejor precio
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all 
                      transform hover:scale-105 shadow-lg"
          >
            Ver Productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
