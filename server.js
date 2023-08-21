'use strict';

const { consumerToQueue } = require('./src/services/consumer-queue.service');
const queueName = 'test-topic';

consumerToQueue(queueName)
  .then(() => {
    console.info(`Message consumer has been started: ${queueName}`);
  })
  .catch((error) => console.error(error));
