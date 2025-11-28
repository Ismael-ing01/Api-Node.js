const controller = require("../controllers/categoria.controller");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");

router.post("/crear", verifyToken, controller.crearCategoria);
router.get("/listar", verifyToken, controller.obtenerCategorias);
router.put("/actualizar/:id", verifyToken, controller.actualizarCategoria);
router.delete("/eliminar/:id", verifyToken, controller.eliminarCategoria);

module.exports = router;
