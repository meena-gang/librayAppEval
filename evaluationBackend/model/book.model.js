const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    price: {type:Number, required:true},
    status:{type:String, required:true},
    userId:{type:String, required:true}

},{
    versionKey:false,
    timestamps:true
})

const BookModel = mongoose.model('book',bookSchema);

module.exports = BookModel;