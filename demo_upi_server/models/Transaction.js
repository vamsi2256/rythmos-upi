const mongoose=require('mongoose')

const TransactionSchema=new mongoose.Schema({
    receiver:{
        type:Object,
        required:true,
    },
    sender:{
        type:Object,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
})

const transUser=mongoose.model('transaction',TransactionSchema)
module.exports=transUser