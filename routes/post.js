const express=require('express');
const verify=require('../middlewares/verify');
const postSchema=require('../models/postSchema');
const apiUtils=require('../utils/apiUtils');
const upload=require('../middlewares/upload')

const router = express.Router();


router.post('/newpost',verify,upload.single('image'),(req,res)=>{
    console.log('inside new posts');
    const url=`${req.protocol}://${req.get('host')}`;
    const obj={
        text:req.body.text,
        image:`${url}/public/images/${req.file.filename}`,
        user:req.user['_id'],
        firstName:req.user.firstName
    }
    postSchema.create(obj)
    .then((result)=>{res.status(200).json(result);})
    .catch((err)=>{res.send(apiUtils.getError(400,err))})
})

router.get('/posts',(req,res)=>{
    postSchema.find({},(err,result)=>{
        if(err){
            res.status(400).json(err.message);
        }
        res.send({"statusCode":200,data:result});
    })
})

module.exports=router;