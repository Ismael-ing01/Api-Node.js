const express = require("express");
const app = express();
const sequelize = require(".config/database");
const productoRoutes = require("./routes/producto.route");
require("dotenv").config();
app.use(express.json());

app.use(productoRoutes);

(async () => {
  await sequelize.authenticate();
  console.log("Conexion a la base de datos establecida");
  await sequelize.sync({ alter: true });
  console.log("Sincronizacion de la base de datos completada");
  app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${process.env.PORT}`);
  });
})();
