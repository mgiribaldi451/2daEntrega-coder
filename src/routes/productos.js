const express = require('express')
const { Router } = express
const productsRouter = Router()


// USAR EL MISMO FORMATO YA SEA EN ARCHIVO, FIRESTORE O MONGO...
// CON DESCOMENTAR Y COMENTAR EL USER DAO DEBERIA FUNCIONAR
// CADA RUTA MANEJA SU MODELO Y SUS DAOS... EN ESTE CASO DE USUARIOS

const { ProductDaoMongo } = require('../daos/productsDaoMongo')
const prodDao = new ProductDaoMongo()

// const { ProdDaoFirestore } = require('../daos/productosDaoFirestore')    //FIREBASE
// const prodDao = new ProdDaoFirestore()

productsRouter.get('/', async (req, res) => {
  let products = await prodDao.getAll();
  res.json({products: products})
})

productsRouter.get('/:id', async (req, res) => {
  let prod = await prodDao.getById(req.params.id)
  res.json({prod})
})

productsRouter.post('/', (req, res) => {
  let product = req.body

  if(product && product.name && product.price && product.stock){
    product = prodDao.saveProd(product)
    res.json({result: 'product saved', product: product})
  } else {
    res.json({result: 'Prod cannot saved'})
  }
})

productsRouter.delete('/:id', async (req, res) => {
  let { id } = req.params
  prod = await prodDao.delete(id)
  res.json({result: 'Result', prod_deleted: prod})
})

productsRouter.put('/:id', (req, res) => {
  let prod = req.body 
  let response = prodDao.updateProd(prod, req.params.id)
  res.json(response)
})



module.exports = productsRouter