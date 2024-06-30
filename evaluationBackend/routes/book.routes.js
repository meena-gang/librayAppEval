const express = require('express');
const bookRouter = express.Router();
const BookModel = require('../model/book.model');
const auth = require('../middleWare/auth.middleware');

bookRouter.post('/create', auth,async(req,res) => {
    const{title,author,price,status,userId} = req.body;
    try{
        const book = new BookModel({title,author,price,status,userId});
        await book.save();
        res.status(201).send(book);
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
})

bookRouter.get('/view', auth,async(req,res) => {
    const{status,title,author,limit=10,page} = req.query;
    const query = {};
    if(status){
        query.status = status;
    }
    if(title){
        query.title = title;
    }
    if(author){
        query.author = author;
    }
    try{
        const books = await BookModel.find(query)
        .skip((page-1)*limit)
        .limit(limit);
        res.status(200).send(books);
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
})

bookRouter.delete('/delete/:bookId',auth, async(req,res) => {
    const bookId = req.params.bookId;
    const {userId} = req.body;
    try{
        const result = await BookModel.deleteOne({_id:bookId, userId});
        if(result.deletedCount === 0){
            res.status(404).send("Book not found");
        }else{
            res.status(200).send("Book deleted");
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
})

bookRouter.patch('/update/:bookId', auth,async(req,res) => {
    const bookId = req.params.bookId;
    const {userId,title,price,author} = req.body;
    try{
        const book = await BookModel.findOne({_id:bookId, userId});
        if(book){
            await book.updateOne({title,price,author})
            res.status(200).send("Book updated");
        }else{
            res.status(404).send("Book not found");
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
})

module.exports = bookRouter;
