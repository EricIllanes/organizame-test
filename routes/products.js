const { Router } = require("express");
const {product} = require('../database')
const router = Router()


//ruta get todos los productos
router.get('/product', async (req,res)=>{
    try{
        if(product.length===0){
            res.status(200).send({message:'Aún no se han cargado productos'})
        }
    } catch (err){
        console.error(err)
    }
})

module.exports = router