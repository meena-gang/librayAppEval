const express = require('express');
const FavModel = require('../model/favorite.model');
const auth = require('../middleWare/auth.middleware');
const BookModel = require('../model/book.model');
const favRouter = express.Router();

favRouter.post('/add/:bookId',auth,async(req,res) => {
    const {userId} = req.body;
    const {bookId} = req.params;
 try{
    const book = await BookModel.findOne({_id:bookId});
    if(book){
        const fav = new FavModel({userId,bookId});
        await fav.save();
        res.status(200).json({message:'Book added to favorite'});
    }else{
        res.status(400).json({message:'Book does not exists'});
    }
    res.send('Added to favorite');
    }catch(err){
        res.send(err.message);
    }
})

favRouter.get('/view', auth, async(req,res) => {
    const {userId} = req.body;
    try{
        const favs = await FavModel.find({userId});
        res.status(200).send(favs);
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

favRouter.delete('/delete/:bookId',auth,async(req,res) => {
    const {userId} = req.body;
    const {bookId} = req.params;
    try{
        const result = FavModel.deleteOne({userId,bookId});
        if(result.deletedCount===0){
            res.status(400).send('Book not found');
        }else{
            res.status(200).send('Book deleted from favorites');
        }
    }catch(err){
        res.send(err.message);
    }
})

module.exports = favRouter;