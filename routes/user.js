require('dotenv').config()
const express =require( 'express');
const userSchema=require('../models/userSchema.js');
const bcrypt =require( 'bcrypt');
const apiUtils=require('../utils/apiUtils');
const globalConstant = require('../utils/globalConstant')

const router=express.Router();

router.post('/register',(req,res)=>{
    bcrypt.hash(req.body.password,globalConstant.SALT_ROUNDS)
    .then((hash)=>{
        req.body.password=hash;
        return userSchema.create(req.body)
    })
    .then((resp)=>{
        console.log('new user created');
        res.status(200).json(resp);
    })
    .catch((err)=>{
        res.send(apiUtils.getError(400,`Error occured--> ${err.message}`));
    })
})


router.post('/login',(req,res)=>{
    let user;
    userSchema.findOne({email:req.body.email})
    .then((result)=>{
        if(result){
            user=result;
            return bcrypt.compare(req.body.password,result.password)
        }
        else{
            return Promise.reject(new Error(`user not exists`))
        }
    })
    .then((samePass)=>{
        if(samePass){
            const token=apiUtils.generateAccessToken(user._id);
            res.status(200).json({token:token})
        }
        else{
            return Promise.reject(new Error(`Password not matched`))
        }
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(400).json(apiUtils.getError(400,err.message))
    })
})

module.exports=router;