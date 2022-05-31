const ContainerMongo = require('../contenedores/ContainerMongo')
const cartModel = require('../models/cart')

class CartDaoMongo extends ContainerMongo{
  constructor() {
    super(cartModel);
  }

  saveCart(cart){
    if(cart){
      console.log(cart)
      this.saveCarrito(cart, this.id)
      // console.log(this.id)
      this.id++
      return cart
    } else {
      return 'Not saved'
    }
  }

  updateCart(carrito, id){
    if(carrito) {
      console.log(carrito)
      this.update(carrito, id)
      return carrito
    } else {
      return 'Not updated'
    }
  }

  updateProdsCart(carrito, id){
    if(carrito) {
      console.log(carrito)
      this.addProdToCart(carrito, id)
      return carrito
    } else {
      return 'Not updated'
    }
  }

} 




module.exports = { CartDaoMongo }

