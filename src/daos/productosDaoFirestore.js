const { ContainerFirestore } = require('../contenedores/ContainerFirestore')

class ProdDaoFirestore extends ContainerFirestore {
  constructor(){
    super('productos')
    this.id = 0
    this.checkId()
  }

  // Chequea para obtener el ultimo ID y asignarlo al id local (this.id)
  async checkId(){
    let productos = await this.getAll()

    if(productos.length > 0) {

      this.id = parseInt(productos[productos.length - 1].id) + 1
    }
  }

  saveProd(productos){
    if(productos){
      console.log(productos)
      this.save(productos, this.id)
      // console.log(this.id)
      this.id++
      return productos
    } else {
      return 'Not saved'
    }
  }

  updateProd(productos, id){
    if(productos) {
      console.log(productos)
      this.update(productos, id)
      return productos
    } else {
      return 'Not updated'
    }
  }
}

module.exports = { ProdDaoFirestore }