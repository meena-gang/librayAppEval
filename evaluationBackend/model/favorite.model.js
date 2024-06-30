const mongoose = require('mongoose');

const favSchema = mongoose.Schema({
    bookId: {type:String, ref:'Book',required:true},
    userId: {type:String, ref:'user', required:true},
    
},{
    versionKey:false,
    timestamps:true
})

const FavModel = mongoose.model('fav',favSchema);

module.exports = FavModel;