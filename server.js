'use strict';

const {
  consumerToQueue,
  consumerToQueueFailure,
  consumerToQueueNormal,
} = require('./src/services/consumer-queue.service');
const queueName = 'test-topic';

// consumerToQueue(queueName)
//   .then(() => {
//     console.info(`Message consumer has been started: ${queueName}`);
//   })
//   .catch((error) => console.error(error));

consumerToQueueNormal(queueName)
  .then(() => {
    console.info(`Message consumerToQueueNormal has been started`);
  })
  .catch((error) => console.error(error));

consumerToQueueFailure(queueName)
  .then(() => {
    console.info(`Message consumerToQueueFailure has been started`);
  })
  .catch((error) => console.error(error));
