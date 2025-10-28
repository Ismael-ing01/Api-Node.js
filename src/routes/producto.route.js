const controller = require("../controllers/producto.controller");
const express = require("express");
const router = express.Router();

router.post("/crear", controller.crearProducto);
router.get("/listar", controller.obtenerProductos);

module.exports = router;
