const controller=require("../controller/controller")
const express=require('express')
const validatetoken = require("../middleware/validatetokenhandler")
const router=express.Router()

module.exports=router