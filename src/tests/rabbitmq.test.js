'use strict';

const { connectToRabbitMQTest } = require('../dbs/init.rabbit');

describe('RabbitMQ connection', () => {
    it('should connect to successfull rabbitMQ', async () => {
        const result = await connectToRabbitMQTest();
        expect(result).toBeUndefined();
    })
});