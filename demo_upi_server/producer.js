const { Kafka } = require('kafkajs')
const config = require('./config')

const client = new Kafka({
  brokers: config.kafka.BROKERS,
  clientId: config.kafka.CLIENTID
})

const topic = config.kafka.TOPIC

const producer = client.producer()

module.exports=async function sendMessage(receiver,sender,amount,date){
    
    try{
        await producer.connect()
        let obj={
            receiver:receiver.email,
            sender:sender.email,
            amount:amount,
            date:date ,
        }
        payloads = {
            topic: topic,
            messages: [
              { key: 'transaction-alert', value:JSON.stringify(obj)}
            ]
          }
          console.log('payloads=', payloads)
          producer.send(payloads)
    }
    catch(err){
        console.log(err)
    }
}
