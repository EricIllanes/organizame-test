const {usersDB }= require("../database");
const { Router } = require("express");

const router = Router()

// ruta para obtener los usuarios 
router.get('/user', async (req,res)=>{
    try{
    res.status(200).send(usersDB)
    } catch (err){
        console.error(err)
    }
})

router.post('/login', async(req,res)=>{
    try {
        const {user, password}= req.body
        let userCheck = usersDB.find(userName => userName.user === user)
        if(!userCheck){
            res.status(403).send({message:'El usuario no existe'})
        } else{
            if(userCheck.password.toString() === password){
                res.status(200).send({message:'Logeo exitoso'})
            }  else{
                res.status(403).send({message:`Contraseña incorrecta para ${userCheck.user}`})
            }
        }
    } catch (error) {
        console.error(error)
    }
   
})

module.exports = router