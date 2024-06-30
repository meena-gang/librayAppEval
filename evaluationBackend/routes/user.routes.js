const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const UserModel = require('../model/user.model');
require('dotenv').config();
const key = process.env.SECRET_KEY;
userRouter.post('/register', async(req,res) => {
    const{userName, email,password,age,role} = req.body;
    try{
        bcrypt.hash(password,5,async(err,hash) => {
            if(err){
                res.status(500).send({"msg":"something went wrong"})
            }else{
                const user = new UserModel({userName,email,password:hash,role,age});
                await user.save();
                res.status(200).send({"msg":"user registered successfully"})
            }
        })

    }catch(err){
        res.status(500).send(err);
    }
})

userRouter.post('/login', async(req,res) => {
    const{email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(404).send({"msg":"user not found"})
        }else{
            bcrypt.compare(password, user.password,(err,result) => {
                if(err){
                    res.status(500).send({"msg":"something went wrong"})
                }else{
                    if(result){
                        const token = jwt.sign({email: user.email, role: user.role, id:user._id,name:user.userName},key);
                        res.status(200).send({"msg":"user logged in successfully",token})
                    }else{
                        res.status(401).send({"msg":"password is incorrect"})
                    }
                }
            })
        }

    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = userRouter;