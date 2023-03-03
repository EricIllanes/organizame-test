const { Router } = require("express");
const { product, category } = require("../database");
const router = Router();

const arrayForExport = [];

for (let i = 0; i < product.length; i++) {
  let categoryBind = category.find(
    (categories) => categories.id === product[i].categoria
  );

  arrayForExport.push({
    sku: product[i].sku,
    nombre_producto: product[i].nombre_producto,
    descripcion_producto: product[i].descripcion,
    precio: product[i].precio,
    nombre_corto_categoria: categoryBind.nombre_corto,
    nombre_categoria: categoryBind.nombre_categoria,
    descripcion_categoria: categoryBind.descripcion,
  });
}

function convertToCSV(arrayToConvert, separator) {
  const keys = Object.keys(arrayToConvert[0]);
  const nombreColumn = keys.join(separator);
  const filasCSV = arrayToConvert.map((obj) => {
    return keys.map((key) => obj[key]).join(separator);
  });
  return nombreColumn + "\n" + filasCSV.join("\n");
}

router.get("/export-csv", (req, res) => {
  try {
    const csvData = convertToCSV(arrayForExport, ",");
    const csvBuffer = Buffer.from(csvData, "utf-8");
  
    res.setHeader("Content-Disposition", "attachment; filename=data.csv")
    res.end(csvBuffer);
    
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

module.exports = router;
