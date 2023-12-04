const jwt=require('jsonwebtoken')
const validatetoken =async(req,res,next)=>{

    let token;
    let authheader=req.headers.Authorization|| req.headers.authorization;
    if(authheader&&authheader.startsWith("Bearer")){
        token = authheader.split(" ")[1];
        
        jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
            if(err){
                res.json({message:"please login"})
            }
            
            else{
            req.user=decoded.user;
            next();}
        })
    }
    else{
        res.json({message:"please login"})
    }
}

module.exports=validatetoken;
