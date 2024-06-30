const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.SECRET_KEY;

const auth = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    try{
        const decoded = jwt.verify(token,key, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Access denied' });
            }else{
                req.body.role = decoded.role;
                req.body.userId = decoded.id;
                next();
            }
        });
    
    }catch(err){
        return res.status(401).json({ message: err.message });
    }
}

module.exports = auth;