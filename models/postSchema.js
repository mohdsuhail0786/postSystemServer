const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    text:{
        type:String
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    firstName:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('posts',postSchema);