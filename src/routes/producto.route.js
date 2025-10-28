const controller = require("../controllers/producto.controller");
const express = require("express");
const router = express.Router();

router.post("api/productos", controller.crearProducto);
router.post("api/productos", controller.obtenerProductos);

module.exports = router;
