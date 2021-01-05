const express=require('express')
const session = require('express-session');
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()

const UpiUserSchema=require('./models/UpiModel')
const TransUser=require('./models/Transaction')
const sendMessage=require('./producer')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/upi',{
    useNewUrlParser:true,
},(err,result)=>{
    if(err)
        throw err
    else{
        console.log("Db connected")
    }
})
app.use(
    session({
      key: "sid",
      secret: "session_proj",
      resave: false,
      saveUninitialized: false,
    })
  );

  var checking=(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
        res.redirect("/login")
    }
}
var loginChecking=(req,res,next)=>{
    if(req.session.user){
        res.redirect("/menu")
    }
    else{
        next()
    }
}
var cacheControl=(req,res,next)=>{
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next()
}

app.get("/login",loginChecking,cacheControl,(req,res)=>{
    res.send("Login")
})

app.get("/menu",checking,cacheControl,(req,res)=>{
    res.send("Menu Page")
})

app.post('/Register',cacheControl,async(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const city=req.body.city
    const mobileNumber=req.body.mobileNumber
    const password=req.body.password
    const user=new UpiUserSchema({name:name,email:email,city:city,mobileNumber:mobileNumber,password:password,balance:10000})
    await user.save()
    res.send('data Inserted')
})

app.post('/login',cacheControl,async(req,res)=>{
    const username=req.body.mobileNumber
    const password=req.body.password
    try{
        var user = await UpiUserSchema.findOne({mobileNumber:username})
        if(user){
            if(user.password===password){
                req.session.user = user;
                res.send('user present')
            }
            else{
                res.send('password not matched')
            }   
        }
        else{
           res.send('no user')
        }
    }
    catch(err){
        res.send(err)
    }
})

app.post('/checkBalance',async(req,res)=>{
    const mobileNumber=req.body.mobileNumber
    try{
        const data=await UpiUserSchema.findOne({mobileNumber:mobileNumber})
        let dummy={
            name:data.name,
            mobileNumber:data.mobileNumber,
            balance:data.balance,
        }
        res.send(dummy)
    }
    catch(err){
        res.send(err)
    }
})
app.post('/transaction',async(req,res)=>{
    const rnumber=req.body.rnumber
    //console.log(rnumber)
    try{
        const ruser=await UpiUserSchema.findOne({mobileNumber:rnumber})
        if(ruser){
            //console.log(ruser.name)
            res.send({name:ruser.name,balance:ruser.balance})
        }
        else{
            res.send({name:'no user'})
        }
    }
    catch(err){
        res.send(err)
    }

})
app.post('/pay',async(req,res)=>{
    let dataObj=req.body.obj
    try{
        let receiver=await UpiUserSchema.findOne({mobileNumber:dataObj.rnumber})
        let sender=await UpiUserSchema.findOne({mobileNumber:dataObj.sender})
        const balance=dataObj.amount
        receiver.balance=parseInt(receiver.balance)+parseInt(balance)
        sender.balance=parseInt(sender.balance)-parseInt(balance)
        await receiver.save()
        await sender.save()
        sendMessage(receiver,sender,balance,Date.now())
        res.send(sender.balance.toString())
    }catch(err){
        res.send(err)
    }
})

app.post("/getTransactions",async(req,res)=>{
    let transaction = await TransUser.find({"$or":[{"receiver.mobileNumber":parseInt(req.body.mobile)},
    {"sender.mobileNumber":parseInt(req.body.mobile)}]})
    transactions = Object.values(transaction)
    transactions.reverse()
    res.send(transactions)
})

app.all("/logout",checking,(req,res)=>{
    req.session.destroy()
})

app.listen(3001,()=>{
    console.log("server running in port :3001")
})


