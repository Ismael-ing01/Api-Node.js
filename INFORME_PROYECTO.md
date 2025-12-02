# INFORME TÉCNICO: API REST Node.js - Gestión de Productos

## 1. Introducción

El presente informe detalla el desarrollo e implementación de una API RESTful construida con Node.js. Este proyecto tiene como finalidad proporcionar un servicio backend robusto para la gestión de un inventario de productos y categorías, incorporando medidas de seguridad mediante autenticación de usuarios.

La API permite a los clientes (frontend, aplicaciones móviles, etc.) realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los recursos del sistema, garantizando la integridad y persistencia de los datos en una base de datos relacional.

## 2. Objetivos del Proyecto

*   **General:** Desarrollar una API escalable y segura para la administración de productos.
*   **Específicos:**
    *   Implementar un sistema de autenticación y autorización seguro utilizando JSON Web Tokens (JWT).
    *   Gestionar el ciclo de vida de productos y categorías (CRUD).
    *   Utilizar un ORM (Sequelize) para la interacción con la base de datos MySQL.
    *   Documentar los endpoints de la API para facilitar su consumo.

## 3. Tecnologías Utilizadas

El proyecto se ha desarrollado utilizando el siguiente stack tecnológico:

*   **Lenguaje:** JavaScript (Node.js v14+).
*   **Framework Web:** Express.js (v5.1.0) - Para el manejo de rutas y middleware.
*   **Base de Datos:** MySQL - Sistema de gestión de base de datos relacional.
*   **ORM:** Sequelize (v6.37.7) - Para modelar y consultar la base de datos usando objetos JavaScript.
*   **Seguridad:**
    *   **Bcrypt / Bcryptjs:** Para el hasheo seguro de contraseñas.
    *   **JsonWebToken (JWT):** Para la generación y validación de tokens de sesión.
*   **Documentación:** Swagger UI Express - Para visualizar y probar la API interactivamente.
*   **Herramientas de Desarrollo:** Nodemon, Dotenv.

> **[ESPACIO PARA IMAGEN: LOGOS DE TECNOLOGÍAS O DIAGRAMA DEL STACK]**
> *Inserte aquí una imagen que muestre los logos de Node, Express, MySQL, etc.*

## 4. Arquitectura del Proyecto

El proyecto sigue el patrón de arquitectura **MVC (Modelo-Vista-Controlador)** adaptado a una API REST (donde la "Vista" es la respuesta JSON).

### Estructura de Carpetas

*   `src/app.js`: Punto de entrada de la aplicación. Configuración del servidor y middlewares globales.
*   `src/config/`: Archivos de configuración (ej. conexión a base de datos).
*   `src/models/`: Definición de los modelos de datos (Tablas) usando Sequelize.
*   `src/controllers/`: Lógica de negocio. Reciben las peticiones, procesan datos y envían respuestas.
*   `src/routes/`: Definición de los endpoints y asignación a sus respectivos controladores.
*   `src/middleware/`: Funciones intermedias para validación y autenticación (ej. verificar token).

> **[ESPACIO PARA IMAGEN: ESTRUCTURA DE CARPETAS]**
> *Inserte aquí una captura de pantalla del árbol de directorios del proyecto en VS Code.*

## 5. Base de Datos

La persistencia de datos se maneja en MySQL. El esquema principal consta de las siguientes entidades:

1.  **Usuarios:** Almacena credenciales y datos de perfil.
2.  **Categorías:** Clasificación de los productos.
3.  **Productos:** Artículos del inventario, vinculados a una categoría.

> **[ESPACIO PARA IMAGEN: DIAGRAMA ENTIDAD-RELACIÓN (DER)]**
> *Inserte aquí el diagrama de la base de datos mostrando las tablas y sus relaciones.*

## 6. Descripción de la API (Endpoints)

A continuación se describen los principales recursos disponibles en la API.

### 6.1. Autenticación (`/api/auth`)

Módulo encargado de la seguridad y gestión de sesiones.

*   `POST /register`: Registro de nuevos usuarios.
*   `POST /login`: Inicio de sesión. Retorna Token y Refresh Token.
*   `POST /refresh-token`: Renovación de tokens expirados.
*   `POST /logout`: Cierre de sesión.

> **[ESPACIO PARA IMAGEN: PRUEBA DE LOGIN EN POSTMAN]**
> *Inserte aquí una captura de Postman mostrando una petición de Login exitosa y la respuesta con el token.*

### 6.2. Productos (`/api/productos`)

Gestión del inventario.

*   `POST /crear`: Agregar un nuevo producto (Requiere Auth).
*   `GET /listar`: Obtener todos los productos.
*   `PUT /actualizar/:id`: Modificar datos de un producto.
*   `DELETE /eliminar/:id`: Dar de baja un producto.

> **[ESPACIO PARA IMAGEN: JSON DE UN PRODUCTO]**
> *Inserte aquí una captura de la respuesta JSON al consultar un producto.*

### 6.3. Categorías (`/api/categorias`)

Gestión de las familias de productos.

*   `POST /crear`: Nueva categoría.
*   `GET /listar`: Ver todas las categorías.
*   `PUT /actualizar/:id`: Editar categoría.
*   `DELETE /eliminar/:id`: Borrar categoría.

## 7. Documentación Interactiva (Swagger)

El proyecto incluye documentación autogenerada con Swagger. Esto permite visualizar y probar los endpoints directamente desde el navegador.

*   **Ruta:** `/api-docs` (o la ruta configurada en `swagger.js`).

> **[ESPACIO PARA IMAGEN: INTERFAZ DE SWAGGER UI]**
> *Inserte aquí una captura de pantalla de la página de Swagger mostrando la lista de endpoints.*

## 8. Conclusiones

Este proyecto demuestra la implementación efectiva de una API REST moderna utilizando el ecosistema de Node.js. La arquitectura modular facilita el mantenimiento y la escalabilidad futura, permitiendo agregar nuevas funcionalidades sin afectar el núcleo del sistema. La integración de seguridad con JWT y la documentación con Swagger aseguran que la API sea tanto segura como fácil de integrar para desarrolladores frontend.
