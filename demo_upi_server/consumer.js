const { Kafka } = require('kafkajs')
const config = require('./config')
const nodemailer=require('nodemailer');

const kafka = new Kafka({
  clientId: config.kafka.CLIENTID,
  brokers: config.kafka.BROKERS
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
            sendMailToReceiver(jsonObj.receiver,jsonObj.amount,jsonObj.date)
            sendMailToSender(jsonObj.sender,jsonObj.amount,jsonObj.date)
            console.log(jsonObj)
        }
        catch(err){
            console.log(err)
        }
      }
    })
  }
  run().catch(e => console.error(`[example/consumer] ${e.message}`, e))
function sendMailToReceiver(receiverMail,amount,date)
  {
    var transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'test.rcx.we4@gmail.com',
            pass:'rcxcoremail'
        }
    })
    var mailOptions = {
        from: 'test.rcx.we4@gmail.com',
        to: receiverMail,
        subject:'Transaction alert',
        text: 'the amount credited in your account rupees.'+amount+
        ' on the date '+ date,
    }
    transport.sendMail(mailOptions)
}
function sendMailToSender(senderMail,amount,date)
  {
    var transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'test.rcx.we4@gmail.com',
            pass:'rcxcoremail'
        }
    })
    var mailOptions = {
        from: 'test.rcx.we4@gmail.com',
        to: senderMail,
        subject:'Transaction alert',
        text: 'the amount debited in your account rupees.'+amount+
        ' on the date '+ date,
    }
    transport.sendMail(mailOptions)
}
    