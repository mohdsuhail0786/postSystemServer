require('dotenv').config();
const userSchema=require('../models/userSchema');
const apiUtils=require('../utils/apiUtils');


const verify=(req,res,next)=>{
    console.log('inside verify');
    const token=req.headers['access-token'];
    if(token){
        apiUtils.VerifyToken(token,process.env.TOKEN_SECRET)
        .then((res)=>{
            return userSchema.findById(res['_id']);
        })
        .then((user)=>{
            req.user=user;
            console.log('user verified');
            next();
        })
        .catch((err)=>{
            res.status(400).send(`Error occured--> ${err.message}`);
        })
    }
    else{
        res.status(400).send('token not found');   
    }
}

module.exports=verify;