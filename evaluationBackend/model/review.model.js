const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    bookId: {type:String, ref:'Book',required:true},
    userId: {type:String, ref:'user', required:true},
    rating: {type:Number, min:1, max:5, required:true},
    text:{type:String, required:true},
},{
    versionKey:false,
    timestamps:true
})

const ReviewModel = mongoose.model('review',reviewSchema);

module.exports = ReviewModel;