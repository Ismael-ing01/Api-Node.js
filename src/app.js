const express = require("express");
const app = express();
const sequelize = require("./config/database");
const cookieParser = require("cookie-parser"); // Importa cookie-parser
const productoRoutes = require("./routes/producto.route");
const categoriaRoutes = require("./routes/categoria.route");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/auth", authRoutes);

(async () => {
  await sequelize.authenticate();
  console.log("Conexion a la base de datos establecida");
  await sequelize.sync({ alter: true });
  console.log("Sincronizacion de la base de datos completada");
  app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${process.env.PORT}`);
  });
})();
