const express=require('express')
const app=express()
const schema = require('../model/userschema')
const  jwt = require('jsonwebtoken');
const  bcrypt =require('bcryptjs')
const saltRounds = 10;
const nodemailer = require('nodemailer');

 exports.create= async (req,res)=>{
    if(req.body.email==='' || req.body.password==='' ||req.body.name===''){
        res.json({message:"all feilds are requried"})
    }
    else{
    const exuser=await schema.findOne({email:req.body.email})
    try{
        const hashedpassword= await bcrypt.hash(req.body.password,saltRounds)
        if(!exuser){
            const lastDocument = await schema.findOne({}, { userid: 1 }, { sort: { userid: -1 } });
      let nextId = 1; // Default value for the first document
      if (lastDocument) {
        nextId = lastDocument.userid + 1;
    }
    const user= await schema.create(
        {
            userid:nextId,
            email:req.body.email,
            name:req.body.name,
            password:hashedpassword
        }
    )
   
    .then((user)=>{
        const token = jwt.sign(
            { user:{
                userid: user.userid, email:user.email} },
            process.env.TOKEN_KEY,
          );
    
          // save user token
          
        res.json({message:"account created successfully",token})
    })
}
    else{
        res.json({message:`${req.body.email} is already existing`})
    }
    }
    catch(error){console.log(error)}
}
 }
exports.Login=async(req,res)=>{
    const exuser= await schema.findOne({email:req.body.email})
    if(exuser){
        if(await bcrypt.compare(req.body.password,exuser.password)){
        const token = jwt.sign(
            { user:{
                userid: exuser.userid, 
                email:exuser.email 
            }
            },
            process.env.TOKEN_KEY,
          );
    
          // save user token
         
          // user
          res.status(200).json({token,message:"sucesss"});
        }
        else{
            res.json({message:"wrong password"})
        }
    }
    else{
        res.json({message:"no user"})
    }
}
