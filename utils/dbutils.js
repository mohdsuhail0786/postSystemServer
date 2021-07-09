require('dotenv').config();
const mongoose =require( 'mongoose');
const MONGO_URI=process.env.MONGO_URI;

const dbconnect=()=>{
    mongoose.connect(MONGO_URI,{useUnifiedTopology:true,useNewUrlParser:true})
    .then((res)=>{
        console.log('connected to mongoDB');
    })
    .catch((err)=>{
        console.log(`error occured:-- ${err.message}`);
    })
}

module.exports=dbconnect;


