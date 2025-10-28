const Producto = require("../models/categoria.model");

exports.crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const nuevoCategoria = await Producto.create({
      nombre,
      descripcion,
    });

    res.status(201).json({ nuevoCategoria });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la categoria", error });
  }
};

exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json({ categorias });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las categorias", error });
  }
};
