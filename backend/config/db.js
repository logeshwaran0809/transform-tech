const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true
})
.then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
    console.log(err)
})