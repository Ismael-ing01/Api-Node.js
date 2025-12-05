# INFORME TÉCNICO: Módulo de Envío de Correos (Resend)

## 1. Introducción

Este informe documenta la implementación del servicio de envío de correos electrónicos transaccionales dentro de la API REST Node.js. Para esta funcionalidad se ha integrado la plataforma **Resend**, que permite una entrega confiable y segura de notificaciones.

## 2. Tecnologías Utilizadas

- **Node.js & Express:** Entorno de ejecución y framework web.
- **Resend SDK:** Librería oficial para la integración con el servicio de emails.
- **Dotenv:** Gestión de variables de entorno para proteger credenciales.

## 3. Implementación Paso a Paso

### 3.1. Instalación y Configuración

1.  **Instalación de Dependencias:**
    Se ejecutó el siguiente comando para instalar las librerías necesarias:

    ```bash
    npm install resend dotenv
    ```

2.  **Seguridad (Variables de Entorno):**
    Se configuró la API Key de Resend en el archivo `.env` para evitar exponer credenciales en el código fuente.
    ```env
    RESEND_API_KEY=re_xxxxxxxx...
    ```

### 3.2. Desarrollo del Endpoint (`/api/email/send`)

Se creó el archivo `src/routes/email.route.js` con la lógica necesaria para:

1.  **Validar la petición:** Verifica que se reciban el destinatario (`to`), asunto (`subject`) y mensaje (`message`).
2.  **Validar formato:** Comprueba que el email del destinatario sea válido usando expresiones regulares.
3.  **Construir el HTML:** Genera una plantilla visual con los datos recibidos.
4.  **Enviar el correo:** Utiliza el método `resend.emails.send()` para procesar el envío.

> **[ESPACIO PARA IMAGEN: CÓDIGO FUENTE]** > _Inserte aquí una captura del código del archivo `src/routes/email.route.js`._

## 4. Verificación y Evidencias

Para validar el funcionamiento, se realizaron pruebas utilizando **Postman**.

### 4.1. Petición de Prueba

Se envió una petición `POST` a `http://localhost:3000/api/email/send` con el siguiente cuerpo JSON:

```json
{
  "to": "delivered@resend.dev",
  "subject": "Prueba de Informe",
  "message": "Este es un mensaje de prueba para el informe.",
  "name": "Usuario Test"
}
```

> **[ESPACIO PARA IMAGEN: POSTMAN]** > _Inserte aquí la captura de Postman mostrando la configuración de la petición y la respuesta exitosa (Status 200)._

### 4.2. Recepción del Correo

El sistema procesó la solicitud correctamente y el correo fue entregado en la bandeja de entrada.

> **[ESPACIO PARA IMAGEN: BANDEJA DE ENTRADA]** > _Inserte aquí una captura del correo recibido, mostrando el asunto y el contenido formateado._

## 5. Generación de Reportes PDF

Adicionalmente, se implementó una funcionalidad para generar reportes de inventario en formato PDF y enviarlos por correo.

### 5.1. Tecnologías Adicionales

- **Puppeteer:** Para la generación del PDF a partir de HTML.
- **Handlebars:** Motor de plantillas para diseñar el reporte.
- **FS-Extra:** Manejo del sistema de archivos.

### 5.2. Implementación

1.  **Plantilla (`src/templates/report.hbs`):** Se diseñó una tabla HTML con estilos CSS para listar los productos.
2.  **Servicio (`src/services/pdf.service.js`):** Lógica para consultar la base de datos, compilar la plantilla y generar el buffer del PDF.
3.  **Endpoint (`/api/email/report`):** Ruta que orquesta la generación y el envío del correo con el adjunto.

> **[ESPACIO PARA IMAGEN: PLANTILLA HBS O SERVICIO PDF]** > _Inserte aquí una captura del código de la plantilla o del servicio._

### 5.3. Verificación

Se realizó una prueba enviando una petición POST a `/api/email/report`. El sistema generó el PDF y lo envió como archivo adjunto.

> **[ESPACIO PARA IMAGEN: CORREO CON PDF ADJUNTO]** > _Inserte aquí la captura del correo recibido donde se vea el archivo PDF adjunto._

## 6. Conclusión

La integración con Resend ha sido exitosa, dotando a la API de la capacidad de enviar notificaciones por correo electrónico de manera eficiente y segura. El código implementado es robusto, incluye validaciones de datos y manejo de errores para asegurar la estabilidad del servicio.
