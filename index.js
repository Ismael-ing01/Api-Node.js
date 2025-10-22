const express = require("express");

const app = express();
require("dotenv").config();
app.use(express.json());

//request, response
app.get("/api/hello", (req, res) => {
  var nombre = "junior";
  res.status(200).json({ mensaje: `Hello my name is ${nombre}` });
});

//post
app.post("/api/hello", (req, res) => {
  const { nombre, apellidos } = req.body;
  console.log(nombre, apellidos);
  res
    .status(201)
    .json({ mensaje: `Se recibio correctamente ${nombre} ${apellidos}` });
});

// crear un endopint de tipo post que reciba en el body datos de un producto

app.post("/api/productos", (req, res) => {
  const { nombre, precio } = req.body;
  console.log(nombre, precio);
  res
    .status(201)
    .json({ mensaje: `Producto ${nombre} con precio ${precio} creado` });
});

//server
app.listen(process.env.PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});
