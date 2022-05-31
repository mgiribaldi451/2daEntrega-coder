const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const carritoCollection = 'carrito';

const cartSchema = new mongoose.Schema({
    id:{type:Number , required:true,max:100},
    name:{type:String,required:true,max:100},
    products:[{
        id: {type:Number,required:false,max:100},
        name: {type:String,required:false,max:100},
        price: {type:Number,required:false,max:100},
        stock: {type:Number,required:false,max:100}
    }
    ]

})

const cart = mongoose.model(carritoCollection,cartSchema)

module.exports = cart