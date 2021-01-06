const { Kafka } = require('kafkajs')
const config = require('./config')

const client = new Kafka({
  brokers: config.kafka.BROKERS,
  clientId: config.kafka.CLIENTID
})

const topic = config.kafka.TOPIC
//const topic1=config.kafka.TOPIC1

const producer = client.producer()

module.exports=async function sendMessage(receiver,sender,amount,date){
    try{
        await producer.connect()
        let obj={
            receiver:receiver,
            sender:sender,
            amount:amount,
            date:date ,
        }
       const payloads = {
            topic: topic,
            messages: [
              { key: 'transaction-alert', value:JSON.stringify(obj)}
            ]
          }
          await producer.send(payloads)
    }
    catch(err){
        console.log(err)
    }
}
