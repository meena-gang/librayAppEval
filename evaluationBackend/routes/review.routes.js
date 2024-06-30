const express = require('express');
const ReviewModel = require('../model/review.model');
const bookRouter = require('./book.routes');
const reviewRouter = express.Router();
const auth = require('../middleWare/auth.middleware')

reviewRouter.post('/create/:bookId', auth,async(req,res) => {
    const {bookId} = req.params;
    const{rating,text,userId} = req.body;
    try{
        const review = new ReviewModel({rating,text,userId,bookId});
        await review.save();
        res.status(201).send(review);
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
})

reviewRouter.get('/view', auth, async(req,res) => {
    try{
        const reviews = await ReviewModel.find();
        res.status(200).send(reviews);
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

reviewRouter.delete('/delete/:reviewId',auth, async(req,res) => {
    const reviewId = req.params.reviewId;
    const {userId} = req.body;
    try{
        const result = await ReviewModel.deleteOne({_id:reviewId, userId});
        if(result.deletedCount === 0){
            res.status(404).send("review not found");
        }else{
            res.status(200).send("review deleted");
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
})

reviewRouter.patch('/update/:reviewId', auth,async(req,res) => {
    const reviewId = req.params.reviewId;
    const{rating,text,userId} = req.body;
    try{
        const review = await ReviewModel.findOne({_id:reviewId, userId});
        if(review){
            await ReviewModel.updateOne({rating,text,userId})
            res.status(200).send("review updated");
        }else{
            res.status(404).send("review not found");
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
})

module.exports = reviewRouter;
