const mongoose=require('mongoose')

const UpiUserSchema=new mongoose.Schema({
    name:{
      type: String,
      required: true,
    },
    email:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    },
})

const UpiUser=mongoose.model('UpiUser',UpiUserSchema)
module.exports=UpiUser