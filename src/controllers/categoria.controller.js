const Categoria = require("../models/categoria.model");

exports.crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const nuevoCategoria = await Categoria.create({
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

exports.actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoria no encontrada" });
    }

    categoria.nombre = nombre;
    categoria.descripcion = descripcion;
    await categoria.save();

    res.status(200).json({ categoria });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al actualizar la categoria", error });
  }
};

exports.eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoria no encontrada" });
    }

    await categoria.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la categoria", error });
  }
};
