const jwt=require('jsonwebtoken');

exports.VerifyToken=(token,secretKey)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secretKey,(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

exports.getError=(statusCode,msg)=>{
    return {
        statusCode:statusCode,
        message:msg
    }
}

exports.getSuccessMessage=(statusCode,msg)=>{
    return {
        statusCode:statusCode,
        message:msg
    }
}

exports.generateAccessToken=(_id)=>{
    return jwt.sign({_id},process.env.TOKEN_SECRET,{ expiresIn: '1800s' });
}