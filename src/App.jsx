import { Outlet } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { useContext } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

const App = () => {
  const { isSidebarOpen } = useContext(CartContext);

  return (
    <>
      <html lang="es" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <div
        className={`flex flex-col min-h-screen ${
          isSidebarOpen ? "overflow-hidden" : ""
        }`}
      >
        <header className="fixed top-0 w-full z-30 bg-white shadow-sm">
          <Header />
          <Nav />
        </header>
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <Sidebar />
      </div>
    </>
  );
};

export default App;
