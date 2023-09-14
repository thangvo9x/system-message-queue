'use strict';

const { consumerQueue, connectToRabbitMQ } = require('../dbs/init.rabbit');

const log = console.log;
console.log = function() {
  log.apply(console, [new Date(),].concat(arguments));
}

const messageService = {
  consumerToQueue: async (queueName) => {
    try {
      const { channel } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error('[messageService] error when consumerToQueue', error);
    }
  },
  // case processing

  consumerToQueueNormal: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const notificationQueue = 'notiQueueProcess';


      setTimeout(() => {
      channel.consume(
        notificationQueue, 
        (msg) => {
        console.log('SEND notification successfully processed:',msg);
        channel.ack(msg);
        }
      );
      }, 12000);

    } catch (error) {
      console.error( error);
    }
  },

  // case failure processing
  consumerToQueueFailure: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const notificationExchangeDLX = 'notificationExDLX'; //notificationExchangeDLX
      const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';

      const notificationQueueHandler = 'notificationQueueHandlerHotFix';

      await channel.assertExchange(notificationExchangeDLX, "direct", notificationRoutingKeyDLX, {
        durable: true
      });

      const queueResult = await channel.assertQueue(notificationQueueHandler, {
        exclusive: false
      })

      await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX)
      await channel.consume(queueResult.queue, msgFailed => {
        console.log('This notification error, hot fix:', msgFailed.content.toString())
      }, {
        noAck: true
      })

    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = messageService;
