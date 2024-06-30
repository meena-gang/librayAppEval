const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {type:String, required:true},
    email: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    age:{type:Number, required:true},
    role:{type:String, required:true}

},{
    versionKey:false,
    timestamps:true
})

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;