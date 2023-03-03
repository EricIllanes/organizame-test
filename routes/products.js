const { Router } = require("express");
const { product, category } = require("../database");
const router = Router();

//ruta pata búsqueda de productos, por ID, por nombre o todos.
router.get("/product", async (req, res) => {
  try {
    const { id, nombre_producto } = req.query;
    if (nombre_producto) {
      let findProductByName = product.find(
        (products) =>
          products.nombre_producto.toLowerCase() ===
          nombre_producto.toLowerCase()
      );
      if (findProductByName) {
        res.status(200).send(findProductByName);
      } else {
        res.status(400).send({
          message: `No existe un producto con el nombre ${nombre_producto}`,
        });
      }
    } else if (id) {
      let findProductById = product.find(
        (products) => products.id.toString() === id
      );
      if (findProductById) {
        res.status(200).send(findProductById);
      } else {
        res
          .status(400)
          .send({ message: `No existe un producto asociado al id: ${id}` });
      }
    } else if (!nombre_producto || !id) {
      if (product.length === 0) {
        res.status(200).send({ message: "Aún no se han cargado productos" });
      } else {
        res.status(200).send(product);
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

//ruta para crear un producto
let acum = 6;
router.post("/product", async (req, res) => {
  try {
    const { sku, nombre_producto, descripcion, precio, categoria } = req.body;
    const findProductByCategoria = category.find(
      (categories) => categories.id === categoria
    );
    const checkSkuNotReapeated = product.find(
      (products) => products.sku === sku
    );

    if (
      !sku?.trim() ||
      !nombre_producto?.trim() ||
      !descripcion?.trim() ||
      !precio ||
      !categoria
    ) {
      res.status(400).send({ message: "Debe proporcionar todos los datos" });
    } else if (sku.length > 5) {
      res
        .status(400)
        .send({ message: "sku no puede tener más de 5 carácteres" });
    } else if (checkSkuNotReapeated) {
      res.status(400).send({ message: "El SKU no puede ser repetido" });
    } else if (!findProductByCategoria) {
      res
        .status(400)
        .send({
          message: `No se ha encontrado una categoría con el id: ${categoria}`,
        });
    } else {
      product.push({
        id: acum,
        sku,
        nombre_producto,
        descripcion,
        precio,
        categoria,
      });
      acum++;
      res
        .status(200)
        .send({ message: `${nombre_producto} se ha agregado correctamente` });
    }
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

//ruta para actualizar un producto pasando el ID del mismo
router.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { sku, nombre_producto, descripcion, precio, categoria } = req.body;
    const productForUpdate = product.find(
      (products) => products.id.toString() === id
    );
    const findProductByCategoria = category.find(
      (categories) => categories.id === categoria
    );
    const checkSkuNotRepeat = product.find((products) => products.sku === sku);
    if (!productForUpdate) {
      res
        .status(400)
        .send({ message: `No hay productos relacionados al id: ${id}` });
    } else {
      if (sku && sku.length > 5) {
        res
          .status(400)
          .send({ message: "Sku no puede tener más de 5 carácteres" });
      
      }else if(checkSkuNotRepeat){
        res
          .status(400)
          .send({message:"El SKU ya existe"})

      } else if (precio && typeof precio !== "number") {
        res.status(400).send({ message: "El precio deben ser números" });
      } else if (!findProductByCategoria) {
        res.status(400).send({
          message: `No se ha encontrado una categoria con el id: ${categoria}`,
        });
      } else {
        if (sku) productForUpdate.sku = sku;
        if (nombre_producto) productForUpdate.nombre_producto = nombre_producto;
        if (descripcion) productForUpdate.descripcion = descripcion;
        if (precio) productForUpdate.precio = precio;
        if (categoria) productForUpdate.categoria = categoria;
        res.status(200).send({
          message: `El producto de id: ${id} se ha actualizado correctamente`,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

//ruta para eliminar un producto pasando su ID
router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let position = product.findIndex(
      (products) => products.id.toString() === id
    );
    if (position === -1) {
      res
        .status(400)
        .send({ message: `No hay productos asociadas al id: ${id}` });
    } else {
      product.splice(position, 1);
      res.status(200).send({ message: "Producto eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

module.exports = router;
