const { Router } = require("express");
const { category } = require("../database");
const router = Router();

//ruta para búsquea de categorías
router.get("/category", async (req, res) => {
  try {
    const { nombre_categoria, id } = req.query;
    if (nombre_categoria) {
      let categoryFindByName = category.find(
        (categories) =>
          categories.nombre_categoria.toLowerCase() ===
          nombre_categoria.toLowerCase()
      );
      if (categoryFindByName) {
        res.status(200).send(categoryFindByName);
      } else {
        res.status(400).send({
          message: `No existe una categoría con el nombre ${nombre_categoria}`,
        });
      }
    } else if (id) {
      let categoryFindById = category.find(
        (categories) => categories.id.toString() === id
      );
      if (categoryFindById) {
        res.status(200).send(categoryFindById);
      } else {
        res
          .status(400)
          .send({ message: `No hay categorías asociadas al id: ${id}` });
      }
    } else if (!nombre_categoria && !id) {
      if (category.length === 0) {
        res.status(200).send({ message: "Aún no se han cargado categorías" });
      } else {
        res.status(200).send(category);
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

//ruta para crear una categoría
let acum = 4;
router.post("/category", async (req, res) => {
  try {
    const { nombre_corto, nombre_categoria, descripcion } = req.body;
    const searchForNameRepeated = category.find(
      (categories) => categories.nombre_corto === nombre_corto
    );
    if (
      !nombre_corto?.trim() ||
      !nombre_categoria?.trim() ||
      !descripcion?.trim()
    )
      res.status(400).send({ message: "Debe proporcionar todos los datos" });
    else if (nombre_corto.length > 5)
      res.send({ message: "nombre_corto máximo 5 carácteres" });
    else if (searchForNameRepeated)
      res
        .status(400)
        .send({ message: "Ya existe una categoria con ese nombre_corto" });
    else {
      category.push({
        id: acum,
        nombre_corto,
        nombre_categoria,
        descripcion,
      });
      res.send({ message: `${nombre_categoria} se ha agregado correctamente` });
      acum++;
    }
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

//ruta para update nombre_categoría o nombre_corto pasando el ID de la misma
router.put("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_categoria, nombre_corto, descripcion } = req.body;
    const checkNombreNotRepeated = category.find(
      (categories) => categories.nombre_corto === nombre_corto
    );
    const categoryForUpdate = category.find(
      (categories) => categories.id.toString() === id
    );
    if (!categoryForUpdate) {
      res.status(400).send({ message: `No existe categoría con id: ${id}` });
    } else {
      if (nombre_corto && nombre_corto.length > 5) {
        res
          .status(400)
          .send({ message: "nombre_corto no puede tener más de 5 carácteres" });
      } else if (checkNombreNotRepeated) {
        res
          .status(400)
          .send({ message: "Ya existe el nombre_corto para la categoría" });
      } else {
        if (nombre_corto) categoryForUpdate.nombre_corto = nombre_corto;
        if (nombre_categoria)
          categoryForUpdate.nombre_categoria = nombre_categoria;
        if (descripcion) categoryForUpdate.descripcion = descripcion;
        res
          .status(200)
          .send({ message: `La categoría de id: ${id} se ha actualizado` });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

//ruta para eliminar categorías pasando el ID de la misma
router.delete("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let position = category.findIndex(
      (categories) => categories.id.toString() === id
    );
    if (position === -1) {
      res
        .status(400)
        .send({ message: `No hay categorías asociadas al id: ${id}` });
    } else {
      category.splice(position, 1);
      res.status(200).send({ message: "Categoría eliminada correctamente" });
    }
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.log(error);
  }
});

module.exports = router;
