const Producto = require("../models/producto.model");

exports.crearProducto = async (req, res) => {
  try {
    const { nombre, precio, stock, descripcion, categoriaId } = req.body;

    const nuevoProducto = await Producto.create({
      nombre,
      precio,
      stock,
      descripcion,
      categoriaId,
    });

    res.status(201).json({ nuevoProducto });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el producto", error });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json({ productos });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los productos", error });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, descripcion, categoriaId } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    producto.nombre = nombre;
    producto.precio = precio;
    producto.stock = stock;
    producto.descripcion = descripcion;
    producto.categoriaId = categoriaId;
    await producto.save();

    res.status(200).json({ producto });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el producto", error });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    await producto.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el producto", error });
  }
};
