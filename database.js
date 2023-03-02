let usersDB= []
let category=[
    {
        "id": 1,
        "nombre_corto": "PCAT1",
        "nombre_categoria": "prueba1",
        "descripcion": "pruebapruebaprueba"
    },
    {
        "id": 2,
        "nombre_corto": "PCAT2",
        "nombre_categoria": "prueba2",
        "descripcion": "pruebapruebaprueba"
    },
    {
        "id": 3,
        "nombre_corto": "PCAT3",
        "nombre_categoria": "prueba3",
        "descripcion": "pruebapruebaprueba"
    }
]
let product=[
    {
        "id": 1,
        "sku": "ZAP1",
        "nombre_producto": "product1",
        "descripcion": "pruebapruebaprueba",
        "precio":150,
        "categoria": 1
    },
    {
        "id": 2,
        "sku": "PANT2",
        "nombre_producto": "product2",
        "descripcion": "pruebapruebaprueba",
        "precio":160,
        "categoria": 2
    },
    {
        "id": 3,
        "sku": "GUANT3",
        "nombre_producto": "product3",
        "descripcion": "pruebapruebaprueba",
        "precio":170,
        "categoria": 2
    },
    {
        "id": 4,
        "sku": "GORRO4",
        "nombre_producto": "product4",
        "descripcion": "pruebapruebaprueba",
        "precio": 180,
        "categoria": 1
    },
    {
        "id": 5,
        "sku": "CHEST5",
        "nombre_producto": "product5",
        "descripcion": "pruebapruebaprueba",
        "precio":190,
        "categoria": 2
    },
]

module.exports={usersDB,category, product }