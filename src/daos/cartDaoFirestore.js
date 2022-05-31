
const { ContainerFirestore } = require('../contenedores/ContainerFirestore')

class CartDaoFirestore extends ContainerFirestore {
  constructor(){
    super('carrito')
    this.id = 0
    this.checkId()
  }

  // Chequea para obtener el ultimo ID y asignarlo al id local (this.id)
  async checkId(){
    let carritos = await this.getAll()

    if(carritos.length > 0) {

      this.id = parseInt(carritos[carritos.length - 1].id) + 1
    }
  }

  saveCart(carrito){
    if(carrito){
      console.log(carrito)
      this.save(carrito, this.id)
      // console.log(this.id)
      this.id++
      return carrito
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

module.exports = {CartDaoFirestore }