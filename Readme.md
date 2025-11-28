# API REST Node.js - Gestión de Productos

API RESTful desarrollada con Node.js para la gestión de productos y categorías, incluyendo un sistema completo de autenticación.

## 🛠️ Tecnologías

- **Node.js**: Entorno de ejecución.
- **Express**: Framework web.
- **Sequelize**: ORM para base de datos SQL.
- **MySQL**: Base de datos relacional.
- **JWT (JsonWebToken)**: Manejo de sesiones y seguridad.
- **Bcrypt**: Encriptación de contraseñas.

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MySQL Server

## ⚙️ Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el siguiente ejemplo:

```env
PORT=3000
DB_NAME=nombre_base_datos
DB_USER=usuario_mysql
DB_PASSWORD=contraseña_mysql
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=tu_clave_secreta_super_segura
```

## 🚀 Instalación y Ejecución

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

## 📚 Documentación de la API

### 🔐 Autenticación

#### Registrar Usuario
`POST /api/auth/register`

**Body:**
```json
{
  "nombre": "Juan Perez",
  "correo": "juan@example.com",
  "password": "password123"
}
```

#### Iniciar Sesión
`POST /api/auth/login`

**Body:**
```json
{
  "correo": "juan@example.com",
  "password": "password123"
}
```
**Respuesta Exitosa (200):** Devuelve un token JWT y establece una cookie `refreshToken`.

#### Refrescar Token
`POST /api/auth/refresh-token`
Requiere cookie `refreshToken` válida.

#### Cerrar Sesión
`POST /api/auth/logout`

---

### 📦 Productos

#### Crear Producto
`POST /api/productos/crear`

**Body:**
```json
{
  "nombre": "Laptop Gamer",
  "precio": 1500.00,
  "stock": 10,
  "descripcion": "Laptop de alta gama",
  "categoriaId": 1
}
```

#### Listar Productos
`GET /api/productos/listar`

#### Actualizar Producto
`PUT /api/productos/actualizar/:id`

**Body:**
```json
{
  "precio": 1400.00,
  "stock": 8
}
```

#### Eliminar Producto
`DELETE /api/productos/eliminar/:id`

---

### 🏷️ Categorías

#### Crear Categoría
`POST /api/categorias/crear`

**Body:**
```json
{
  "nombre": "Electrónica",
  "descripcion": "Dispositivos electrónicos y gadgets"
}
```

#### Listar Categorías
`GET /api/categorias/listar`

#### Actualizar Categoría
`PUT /api/categorias/actualizar/:id`

#### Eliminar Categoría
`DELETE /api/categorias/eliminar/:id`

## 🧪 Pruebas

Utiliza **Postman** o **Insomnia** para probar los endpoints.
> **Nota:** Para los endpoints protegidos (si se implementan middlewares de auth en el futuro), asegúrate de enviar el header `Authorization: Bearer <token>`.
