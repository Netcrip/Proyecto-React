import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import Admin from "../pages/Admin.jsx";
import Error404 from "../pages/Error404.jsx";
import Products from "../pages/Products.jsx";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductDetail from "../pages/ProductDetail";
import ContactPage from "../pages/ContactPage.jsx";
import Offer from "../pages/Offer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "offer",
        element: <Offer />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute adminOnly>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

export default router;
