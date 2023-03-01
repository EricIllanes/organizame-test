const { errorMonitor } = require("events");
const { Router } = require("express");
const {category} = require('../database')
const router = Router()



//ruta para búsquea de categorías
router.get('/category', async (req,res)=>{
    try {
        const {nombre_categoria, id} = req.query
        if(nombre_categoria){
            let categoryFindByName = category.find(category => category.nombre_categoria.toLowerCase() === nombre_categoria.toLowerCase())
            if(categoryFindByName){
                res.status(200).send(categoryFindByName)
            } else {
                res.status(403).send({message:`No existe una categoría con el nombre ${nombre_categoria}`})
            }
        } else if(id){
            let categoryFindById = category.find(category => category.id == id.toString())
            if(categoryFindById){
                res.status(200).send(categoryFindById)
            } else{
                res.status(403).send({message:`No hay categorías asociadas al id: ${id}`})
            }

        } else if(!nombre_categoria && !id){
            if(category.length===0){
                res.status(200).send({message:'Aún no se han cargado categorías'})
            } else {
                res.send(category)
            }
        }
    } catch (error) {
        console.error(error)
    }
})


//ruta para crear una categoría
router.post('/category', async(req,res)=>{
    try {
        const {nombre_corto, nombre_categoria, descripcion} = req.body
        if(!nombre_corto || !nombre_categoria || !descripcion)  res.status(403).send({message: "Debe proporcionar todos los datos"})
           else if(nombre_corto.length > 5) res.send({message:"nombre_corto máximo 5 carácteres"})
            else {
              
                category.push({
                    id: Date.now(),
                    nombre_corto,
                    nombre_categoria,
                    descripcion
                })
             
                res.send({message:`${nombre_categoria} se ha agregado correctamente`})
               
            }
           
    } catch (error) {
        console.error(error)
    }
})



module.exports = router