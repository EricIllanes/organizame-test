const { Router } = require("express");
const { product, category } = require("../database");
const router = Router();

let arrayForExport=[]

for(let i=0; i<product.length;i++){
  let categoryBind=category.find(categories=> categories.id=== product[i].categoria)

  arrayForExport.push(
  {
    sku: product[i].sku,
    nombre_producto: product[i].nombre_producto,
    descripcion_producto:product[i].descripcion,
    precio: product[i].precio,
    nombre_corto_categoria:categoryBind.nombre_corto,
    nombre_categoria: categoryBind.nombre_categoria,
    descripcion_categoria: categoryBind.descripcion
  })
}

function convertToCSV(objArray, separator) {
  const keys = Object.keys(objArray[0]);
  const csvHeader = keys.join(separator);
  const csvRows = objArray.map(obj => {
    return keys.map(key => obj[key]).join(separator);
  });
  return csvHeader + '\n' + csvRows.join('\n');
}


router.get('/export-csv', (request, response) => {
  const csvData = convertToCSV(arrayForExport, ',');
  const csvBuffer = Buffer.from(csvData, 'utf-8');
  response.setHeader('Content-Disposition', 'attachment; filename=data.csv');
  response.end(csvBuffer);
});

module.exports = router;