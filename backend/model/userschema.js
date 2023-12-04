const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
    userid:Number,
    name:String,
    email:String,
    password:String,
    
})
module.exports=mongoose.model("user",userSchema)