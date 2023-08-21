'use strict';

const { consumerQueue, connectToRabbitMQ } = require('../dbs/init.rabbit');

const messageService = {
  consumerToQueue: async (queueName) => {
    try {
      const { channel } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.error('[messageService] error when consumerToQueue', error);
    }
  },
};

module.exports = messageService;
