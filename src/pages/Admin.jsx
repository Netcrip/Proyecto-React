import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { productService } from "../services/productsService";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
    rating: 0,
    discount: 0,
    stock: 0,
    brand: "",
    category: ""
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getAllProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convertir a número los campos que lo requieren
    const numericFields = ['price', 'rating', 'discount', 'stock'];
    const processedValue = numericFields.includes(name) ? 
      value === '' ? '' : parseFloat(value) : 
      value;

    setFormData({
      ...formData,
      [name]: processedValue
    });
  };
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      rating: product.rating,
      discount: product.discount,
      stock: product.stock,
      brand: product.brand,
      category: product.category
    });
    setIsEditModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalFormData = {
        ...formData,
        price: formData.price || 0,
        rating: formData.rating || 0,
        discount: formData.discount || 0,
        stock: formData.stock || 0
      };

      if (editingProduct) {
        const updatedProduct = await productService.updateProduct(editingProduct.id, finalFormData);
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      } else {
        const newProduct = await productService.createProduct(finalFormData);
        setProducts([...products, newProduct]);
      }
      setIsEditModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  const formatNumber = (value, decimals = 2) => {
    return typeof value === 'number' ? value.toFixed(decimals) : value;
  };

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
                  <p className="text-2xl">{products.length}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h3 className="font-bold">Pedidos Hoy</h3>
                  <p className="text-2xl">24</p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Administrar Productos</h2>
                  <button 
                    onClick={() => {
                      setEditingProduct(null);
                      setFormData({
                        name: "",
                        price: 0,
                        image: "",
                        description: "",
                        rating: 0,
                        discount: 0,
                        stock: 0,
                        brand: "",
                        category: ""
                      });
                      setIsEditModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Añadir Producto
                  </button>
                </div>

                {loading ? (
                  <p>Cargando productos...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b">ID</th>
                          <th className="py-2 px-4 border-b">Imagen</th>
                          <th className="py-2 px-4 border-b">Título</th>
                          <th className="py-2 px-4 border-b">Precio</th>
                          <th className="py-2 px-4 border-b">Stock</th>
                          <th className="py-2 px-4 border-b">Categoría</th>
                          <th className="py-2 px-4 border-b">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td className="py-2 px-4 border-b">{product.id}</td>
                            <td className="py-2 px-4 border-b">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-10 h-10 object-cover"
                              />
                            </td>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">${product.price}</td>
                            <td className="py-2 px-4 border-b">{product.stock}</td>
                            <td className="py-2 px-4 border-b">{product.category}</td>
                            <td className="py-2 px-4 border-b">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openEditModal(product)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para editar/crear producto */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? "Editar Producto" : "Añadir Producto"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Imagen URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows="3"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"      
                      min="0"
                      max="5"
                      step="0.01"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descuento (%)</label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      min="0"
                      step="0.01"
                      max="100"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Marca</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {editingProduct ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;