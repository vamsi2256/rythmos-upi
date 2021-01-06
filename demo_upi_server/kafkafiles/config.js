module.exports = {
    kafka: {
      TOPIC: 'mail-message',
      //TOPIC1:'transaction-message',
      BROKERS: ['localhost:9092'],
      GROUPID: 'mail-message-group',
      //GROUPID1:'transaction-message-group',
      CLIENTID: 'sample-kafka-client',
    }
  }