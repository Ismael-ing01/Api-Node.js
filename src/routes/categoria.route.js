const controller = require("../controllers/categoria.controller");
const express = require("express");
const router = express.Router();

router.post("/crear", controller.crearCategoria);
router.get("/listar", controller.obtenerCategorias);

module.exports = router;
