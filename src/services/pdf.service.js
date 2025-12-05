const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
const Producto = require("../models/producto.model");
const Categoria = require("../models/categoria.model");

const compile = async (templateName, data) => {
  const filePath = path.join(
    process.cwd(),
    "src",
    "templates",
    `${templateName}.hbs`
  );
  const html = await fs.readFile(filePath, "utf-8");
  return hbs.compile(html)(data);
};

const generateProductReport = async () => {
  try {
    const products = await Producto.findAll({
      include: [{ model: Categoria, as: "categoria" }],
      raw: true,
      nest: true,
    });

    const data = {
      products: products,
      totalProducts: products.length,
      date: new Date().toLocaleDateString("es-ES"),
    };

    const content = await compile("report", data);

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(content);
    const buffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    return buffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

module.exports = {
  generateProductReport,
};
