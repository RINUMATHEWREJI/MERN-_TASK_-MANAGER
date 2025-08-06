const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY; 

const authMiddleware = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({error:'authorization header missing'});
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();

    }
    catch(error){
        console.log("error: ",error.message);
        return res.status(400).json({error:'invallid token'});
    }
};

const requireAdmin = (req,res,next)=>{
    if (req.role !== 'admin'){
        return res.status(403).json({error:'access denied'});
    }
    next();
};

module.exports = {authMiddleware,requireAdmin};