# 🛍️ Mi E-Commerce - Tienda Online React

Una solución completa de comercio electrónico desarrollada con el stack moderno de React que ofrece todas las funcionalidades esenciales para una tienda online.

## 🌟 Características destacadas

### 🛒 Experiencia de compra
- Carrito de compras persistente (localStorage)
- Sidebar móvil para gestión del carrito
- Cálculo automático de totales
- Gestión de cantidades y stock
- Proceso de checkout simulado

### 🔐 Seguridad y usuarios
- Sistema de autenticación completo (Simulado)
- Roles de usuario (cliente/administrador)
- Protección de rutas privadas
- Perfil de usuario

### 🛠 Panel de administración
- CRUD completo de productos
- Búsqueda y filtrado avanzado
- Formularios de validación
- Modales para edición/creación
- Visualización de estadísticas

### 🎨 Diseño y UX
- Interfaz moderna con Tailwind CSS
- 100% responsive (mobile-first)
- Animaciones y transiciones
- Feedback visual con toast notifications


## 💻 Stack tecnológico

### Frontend
| Tecnología | Uso |
|------------|-----|
| React 18 | Componentes funcionales y hooks |
| React Router 6 | Navegación y rutas protegidas |
| Context API | Gestión de estado global |
| Tailwind CSS | Estilizado y diseño responsive |
| Axios | Conexión con API |
| React Icons | Librería de iconos |
| React Hot Toast | Notificaciones |
|SEO - React 19v |Gestion Titulo & metadata|

### Backend (Mock)
```bash
MockAPI.io - API REST simulada
```
## Instalación

### Instala las dependencias:
```bash
cd mi-ecommerce
npm install
```
### Configuracion Variable de entorno:
```env
VITE_API_BASE_URL=https://6840cad8d48516d1d3597317.mockapi.io/api/web (tu url de mockapi.io)
```
### Inicia la aplicación:
```bash
npm run dev
```
## Estructura del Proyecto
```bash
src/
├── components/       # Componentes reutilizables
├── context/          # Contextos de React
├── pages/            # Páginas de la aplicación
├── services/         # Servicios API
├── routes/           # Rutas
├── assets/           # Assets estáticos
├── App.jsx           # Componente principal
└── main.jsx          # Punto de entrada
```

