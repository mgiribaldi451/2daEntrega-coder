const express = require('express')
const { Router } = express
const cartRouter = Router()


const { CartDaoMongo } = require('../daos/cartDaoMongo')
const cartDao = new CartDaoMongo()

// const { CartDaoFirestore } = require('../daos/cartDaoFirestore')   //FIREBASE
// const cartDao = new CartDaoFirestore()

// ACA VAN MIS RUTAS A '/api/carrito'

cartRouter.get('/', async (req, res) => {
  let carts = await cartDao.getAll();
  res.json({carts: carts})
  //res.json({carts})
})

cartRouter.get('/:id', async (req, res) => {
  let cart = await cartDao.getById(req.params.id)
  res.json({cart})
})

  cartRouter.post('/', (req, res) => {
    let cart = req.body
  
    if(cart && cart.name && cart.products){
      carro = cartDao.saveCart(cart)
      res.json({result: 'cart saved', cart: carro})
    } else {
      res.json({result: 'cart cannot saved'})
    }
  })

    cartRouter.delete('/:id', async (req, res) => {
    let { id } = req.params
    cart = await cartDao.delete(id)
    res.json({result: 'Result', prod_deleted: cart})
  })

    cartRouter.put('/:id', (req, res) => {
    let cart = req.body 
    let response = cartDao.updateCart(cart, req.params.id)
    res.json(response)
  })
  cartRouter.put('/:id/productos', (req, res) => {
    let cart = req.body 
    let response = cartDao.updateProdsCart(cart, req.params.id)
    res.json(response)
  })

module.exports = cartRouter
