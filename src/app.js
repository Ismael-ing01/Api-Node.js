require("dotenv").config();
const express = require("express");
const emailRoutes = require("./routes/email.route");
const app = express();
const sequelize = require("./config/database");
const cookieParser = require("cookie-parser"); // Importa cookie-parser
const productoRoutes = require("./routes/producto.route");
const categoriaRoutes = require("./routes/categoria.route");
const authRoutes = require("./routes/auth.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({
    message: "🚀 API Rest Node.js funcionando",
    endpoints: {
      sendEmail: "POST /api/email/send",
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("╔════════════════════════════════════════╗");
  console.log(`║   Servidor corriendo en puerto ${PORT}  ║`);
  console.log("╠════════════════════════════════════════╣");
  console.log(`║   Endpoint: /api/email/send          ║`);
  console.log(`║   URL: http://localhost:${PORT}         ║`);
  console.log("╚════════════════════════════════════════╝");
});

(async () => {
  await sequelize.authenticate();
  console.log("Conexion a la base de datos establecida");
  await sequelize.sync({ alter: true });
  console.log("Sincronizacion de la base de datos completada");
  app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${process.env.PORT}`);
  });
})();
