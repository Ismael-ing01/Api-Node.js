const { dataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Producto = sequelize.define("Producto", {
  id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: dataTypes.STRING, allowNull: false },
  precio: { type: dataTypes.FLOAT, allowNull: false },
  stock: { type: dataTypes.INTEGER, allowNull: false },
});

module.exports = Producto;
