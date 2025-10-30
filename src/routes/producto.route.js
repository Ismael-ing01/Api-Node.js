const controller = require("../controllers/producto.controller");
const express = require("express");
const router = express.Router();

router.post("/crear", controller.crearProducto);
router.get("/listar", controller.obtenerProductos);
router.put("/actualizar/:id", controller.actualizarProducto);
router.delete("/eliminar/:id", controller.eliminarProducto);

module.exports = router;
