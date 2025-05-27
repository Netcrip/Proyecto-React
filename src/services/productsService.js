import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  async getAllProducts() {
    try {
      const response = await api.get("/products?limit=100");
      return response.data.products.map((product) => ({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.thumbnail,
        description: product.description,
        rating: product.rating,
        discount: product.discountPercentage,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
      }));
    } catch (error) {
      console.error("Error al obtener los Productos:", error);
      throw error;
    }
  },


  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return this.transformProduct(response.data);
    } catch (error) {
      console.error(`Error produco no encontrado ${id}:`, error);
      throw error;
    }
  },

  transformProduct(product) {
    return {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      description: product.description,
      rating: product.rating,
      discount: product.discountPercentage,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
    };
  },
};
