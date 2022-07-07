//this file is for giving user access to protected routes

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({msg: "Authorization Denied due to lack of token"})
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).jon({msg: "Authorization denied to an unauthorized token"})
        }
        req.user = verified;
        next();
    } catch(err){
        rs.status(401).json({msg: err});
    }
}