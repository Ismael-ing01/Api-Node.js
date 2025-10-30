const controller = require("../controllers/categoria.controller");
const express = require("express");
const router = express.Router();

router.post("/crear", controller.crearCategoria);
router.get("/listar", controller.obtenerCategorias);
router.put("/actualizar/:id", controller.actualizarCategoria);
router.delete("/eliminar/:id", controller.eliminarCategoria);

module.exports = router;
