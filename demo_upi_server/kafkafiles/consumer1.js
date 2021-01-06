const { Kafka } = require('kafkajs')
const config = require('./config')
const mongoose = require('mongoose')
const TransUser=require('../models/Transaction')

const kafka = new Kafka({
  clientId: config.kafka.CLIENTID,
  brokers: config.kafka.BROKERS
})

mongoose.connect('mongodb://localhost:27017/upi',{
    useNewUrlParser:true,useUnifiedTopology: true
},(err,result)=>{
    if(err)
        throw err
    else{
        console.log("Db connected")
    }
})

const topic = config.kafka.TOPIC
const consumer = kafka.consumer({
  groupId: config.kafka.GROUPID
})
const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ message }) => {
        try{
            const jsonObj = JSON.parse(message.value.toString())
            console.log(jsonObj)
            console.log("transaction executed")
            let result = await TransUser({receiver:jsonObj.receiver,sender:jsonObj.sender,amount:jsonObj.amount,date:jsonObj.date})
            result.save()
        }
        catch(err){
            console.log(err)
        }
      }
    })
  }
  run().catch(e => console.error(`[example/consumer1] ${e.message}`, e))