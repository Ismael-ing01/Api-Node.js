const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/register", controller.registrar);
router.post("/login", controller.login);
router.post("/refresh-token", controller.refreshToken);
router.post("/logout", controller.logout);

module.exports = router;
