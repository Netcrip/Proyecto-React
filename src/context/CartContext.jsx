import { createContext, useState, useCallback } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem && existingItem.quantity >= product.stock) {
      toast.error(
        `No hay suficiente stock ${product.name}. Máximo disponible: ${product.stock}`,
        {
          duration: 4000,
          position: "top-center",
        }
      );
      return;
    }
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === product.id);

      if (item) {
        return prevItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} añadido al carrito`, {
      duration: 2000,
      position: "top-center",
    });
  };
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };
  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, Math.min(quantity, item.stock));
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
