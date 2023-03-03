const { usersDB } = require("../database");
const { Router } = require("express");

const router = Router();

// ruta para obtener los usuarios
router.get("/user", async (req, res) => {
  try {
    res.status(200).send(usersDB);
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    let userCheck = usersDB.find((userName) => userName.user === user);
    if (!userCheck) {
      res.status(400).send({ message: "El usuario no existe" });
    } else {
      if (userCheck.password === password) {
        res.status(200).send({ message: "Login exitoso" });
      } else {
        res
          .status(400)
          .send({ message: `Contraseña incorrecta para ${userCheck.user}` });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Algo ha fallado en el servidor" });
    console.error(error);
  }
});

module.exports = router;
