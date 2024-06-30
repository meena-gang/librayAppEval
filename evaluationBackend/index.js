const express = require('express');

const server = express();
const connection = require('./config/db');
const userRouter = require('./routes/user.routes');
const bookRouter = require('./routes/book.routes');
const reviewRouter = require('./routes/review.routes');
const favRouter = require('./routes/favorite.route');

server.use(express.json());
server.use('/user',userRouter);
server.use('/book',bookRouter);
server.use('/review',reviewRouter);
server.use('/fav',favRouter);

const port = process.env.PORT || 3000;

server.listen(port, async(req,res) => {
    try{
        await connection;
        console.log(`Connected to database and server is running on ${port}`);
    }
    catch(err){
        console.log(err);
    }
})
