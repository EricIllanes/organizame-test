const {Router} = require('express')
const userRoute = require('./users')
const productsRoute = require("./products")
const categoryRoute= require('./category')

const router = Router()
// agregamos todas las rutas que tenemos en los archivos
router.use(userRoute, productsRoute, categoryRoute)

// exportamos para que puedan ser usadas en otro archivo
module.exports = router;