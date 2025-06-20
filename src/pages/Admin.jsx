import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { productService } from "../services/productsService";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    category: "",
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

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const numericFields = ["price", "rating", "discount", "stock"];
    const processedValue = numericFields.includes(name)
      ? value === ""
        ? ""
        : parseFloat(value)
      : value;

    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
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
      category: product.category,
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
        stock: formData.stock || 0,
      };

      if (editingProduct) {
        const updatedProduct = await productService.updateProduct(
          editingProduct.id,
          finalFormData
        );
        setProducts(
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
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

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });

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
                  <h2 className="text-xl font-semibold">
                    Administrar Productos
                  </h2>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setFormData({
                        name: "",
                        price: 0,
                        image:
                          "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg",
                        description: "",
                        rating: 0,
                        discount: 0,
                        stock: 0,
                        brand: "",
                        category: "",
                      });
                      setIsEditModalOpen(true);
                    }}
                    className="flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Añadir Producto
                    <FaPlus />
                  </button>
                </div>

                <div className="mb-6 relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Filtrar por nombre o descripción..."
                      className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                  {searchTerm && (
                    <p className="text-sm text-gray-500 mt-1">
                      Mostrando {filteredProducts.length} de {products.length}{" "}
                      productos
                    </p>
                  )}
                </div>

                {loading ? (
                  <p>Cargando productos...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b hidden sm:table-cell">ID</th>
                          <th className="py-2 px-4 border-b hidden sm:table-cell">
                            Imagen
                          </th>
                          <th className="py-2 px-4 border-b">Título</th>
                          <th className="py-2 px-4 border-b">Precio</th>
                          <th className="py-2 px-4 border-b">Stock</th>
                          <th className="py-2 px-4 border-b hidden md:table-cell">
                            Categoría
                          </th>
                          <th className="py-2 px-4 border-b">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b hidden sm:table-cell text-center align-middle">{product.id}</td>
                            <td className="py-2 px-4 border-b hidden sm:table-cell text-center align-middle">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 object-cover mx-auto"
                              />
                            </td>
                            <td className="py-2 px-4 border-b font-medium">
                              {product.name}
                            </td>
                            <td className="py-2 px-4 border-b text-center align-middle">
                              ${product.price}
                            </td>
                            <td className="py-2 px-4 border-b text-center align-middle">
                              {product.stock}
                            </td>
                            <td className="py-2 px-4 border-b hidden md:table-cell text-center align-middle">
                              {product.category}
                            </td>
                            <td className="py-2 px-4 border-b text-center align-middle">
                              <div className="flex space-x-2 justify-center">
                                <button
                                  onClick={() => openEditModal(product)}
                                  className="text-blue-500 hover:text-blue-700 p-1"
                                  title="Editar"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                  title="Eliminar"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {filteredProducts.length === 0 && searchTerm && (
                      <div className="text-center py-4 text-gray-500">
                        No se encontraron productos que coincidan con "
                        {searchTerm}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-20 "></div>

          <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? (
                  <>
                    <div className="flex gap-2 items-center mr-2">
                      <FaEdit />
                      Editar Producto
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 items-center mr-2">
                      <FaPlus />
                      Añadir Producto
                    </div>
                  </>
                )}
              </h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Precio
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Imagen URL
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
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
                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700">
                      Descuento (%)
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700">
                      Stock
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700">
                      Marca
                    </label>
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
                  <label className="block text-sm font-medium text-gray-700">
                    Categoría
                  </label>
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
