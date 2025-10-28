const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Categoria = require("./categoria.model");

const Producto = sequelize.define("Producto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
});

Categoria.hasMany(Producto, { foreignKey: "categoriaId", as: "productos" });

Producto.belongsTo(Categoria, { foreignKey: "categoriaId", as: "categoria" });

module.exports = Producto;
