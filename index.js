require('dotenv').config();
const express=require('express');
const dbconnect=require('./utils/dbutils.js');
const cors =require( 'cors');
const userRoutes=require('./routes/user.js');
const postRoutes =require('./routes/post.js');
const PORT =process.env.PORT||4000;

const app=express();

app.use(cors());
app.use(express.json());
app.use('/public/images',express.static('public/images'))
app.use(userRoutes);
app.use(postRoutes);

app.listen(PORT,()=>{
    console.log(`Server is started at PORT ${PORT}`);
    dbconnect();
})