const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

const generarToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      correo: user.correo,
      nombre: user.nombres,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const generarRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    const existe = await Usuario.findOne({ where: { correo: correo } });
    if (existe) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const hasd = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      password: hasd,
    });

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      Usuario: nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor" });
    console.error(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ where: { correo: correo } });

    if (!usuario) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    const token = generarToken(usuario);
    const refresghToken = generarRefreshToken(usuario);
    await usuario.update({ refreshToken: refresghToken });

    res.cookie("refreshToken", refresghToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ mensaje: "Login exitoso", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error en el servidor", error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    const usuario = await Usuario.findOne({ where: { refreshToken: token } });
    if (!usuario) return res.status(401).json({ message: "No autorizado" });

    try {
      jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    } catch (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    const nuevoToken = generarToken(usuario); // Genera un nuevo token
    res.status(200).json({ token: nuevoToken });
  } catch (error) {
    console.error(error); // Agrega un log para depuración
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(204).end();
    const usuario = await Usuario.findOne({ where: { refreshToken: token } });
    if (!usuario) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.status(204).end();
    }

    await usuario.update({ refreshToken: null });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.json({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};
