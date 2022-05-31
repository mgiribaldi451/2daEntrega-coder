const mongoose = require('mongoose')
const MONGO_URI = 'mongodb+srv://admin:admin@cluster0.ky0aqm9.mongodb.net/ecommerce?retryWrites=true&w=majority'
const prodModel = require('../models/products')
const cartModel = require('../models/cart')

class ContainerMongo {
  constructor(model) {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Connected'))

    this.model = model;
  }

  async getAll(){
    return await this.model.find()
  }

  async getById(ids) {
    return await this.model.find({ id: ids })
  }

  async save(document) {

     let prod = prodModel
     let saveProd = new prod(document)
    let save=saveProd.save()
    return save

  }

  async saveCarrito(document) {

    let cart = cartModel
    let saveCart = new cart(document)
   let save=saveCart.save()
   return save

 }

  async update(content, ids){
    const filter = { id: ids };
    //const updates = content ;
    let doc = await this.model.findOneAndUpdate(filter, content, {
        new: true
      });
    return doc
  }

  async delete(ids){
    const filter = { id: ids };
    //const updates = content ;
    let doc = await this.model.deleteOne(filter);
  }

  async addProdToCart(content, ids){
    const filter = { id: ids };
    let doc = await this.model.findOneAndUpdate(filter, {$push: {products:content}});
    return doc
  }
}



module.exports = ContainerMongo;