const controller = require("../controllers/producto.controller");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");

router.post("/crear", verifyToken, controller.crearProducto);
router.get("/listar", verifyToken, controller.obtenerProductos);
router.put("/actualizar/:id", verifyToken, controller.actualizarProducto);
router.delete("/eliminar/:id", verifyToken, controller.eliminarProducto);

module.exports = router;
