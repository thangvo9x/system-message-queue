'use strict';

const amqp = require('amqplib');

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:12345@localhost');
    if (!connection) throw new Error('Connection has invalid');

    const channel = await connection.createChannel();
    return { channel, connection };
  } catch (error) {}
};

const connectToRabbitMQTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();
    // puslish message to a queue
    const queue = 'test queue';
    const messages = 'Hello, shopDev';
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(messages));

    // close connection
    await connection.close();
  } catch (error) {
    console.error('Error connecting to rabbitmq', error);
  }
};

const consumerQueue = async (channel, queueName) => {
  try {
    await channel.assertQueue(queueName, { durable: true });
    console.info('Waiting for messages...');
    channel.consume(
      queueName,
      (msg) => {
        // console.info({
        //   msg,
        //   message: `Received messages- ${queueName}: ${msg.content.toString()}`,
        // });
        console.info( `Received messages- ${queueName}: ${msg.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error('error when publish message to rabbitmq', error);
  }
};

module.exports = {
  connectToRabbitMQ,
  connectToRabbitMQTest,
  consumerQueue,
};
