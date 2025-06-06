import axios from "axios";

const api = axios.create({
  baseURL: "https://6840cad8d48516d1d3597317.mockapi.io/api/web",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  async getAllProducts() {
    try {
      const response = await api.get("/products");
      return response.data.map((product) => ({
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

    async createProduct(productData) {
    try {
      const dataToSend = {
        title: productData.name,
        price: productData.price,
        thumbnail: productData.image,
        description: productData.description,
        rating: productData.rating,
        discountPercentage: productData.discount,
        stock: productData.stock,
        brand: productData.brand,
        category: productData.category,
      };
      
      const response = await api.post("/products", dataToSend);
      return this.transformProduct(response.data);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      throw error;
    }
  },

  async updateProduct(id, productData) {
    try {
      const dataToSend = {
        title: productData.name,
        price: productData.price,
        thumbnail: productData.image,
        description: productData.description,
        rating: productData.rating,
        discountPercentage: productData.discount,
        stock: productData.stock,
        brand: productData.brand,
        category: productData.category,
      };
      
      const response = await api.put(`/products/${id}`, dataToSend);
      return this.transformProduct(response.data);
    } catch (error) {
      console.error(`Error al actualizar el producto (ID: ${id}):`, error);
      throw error;
    }
  },

  async deleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data; 
    } catch (error) {
      console.error(`Error al eliminar el producto (ID: ${id}):`, error);
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
