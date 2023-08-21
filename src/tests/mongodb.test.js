'use strict';

const mongoose = require('mongoose');
const connectString = 'mongodb://localhost:27017/shopDev';

const TestSchema = mongoose.Schema({ name: String });
const Test = mongoose.model('Test', TestSchema);

describe('Mongoose connection', () => {
  let connection;
  beforeAll(async () => {
    connection = await mongoose.connect(connectString);
  });

  it('Show connect to mongoose', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  it('Should save a document to be successfull', async () => {
    const user = new Test({ name: 'Tony Vo' });
    await user.save();
    expect(user.isNew).toBe(false);
  });

  it('Should find a document in collection', async () => {
    const user = await Test.findOne({ name: 'Tony Vo' });
    expect(user.isNew).toBeDefined();
    expect(user.name).toBe('Tony Vo');
  });

  afterAll(async () => {
    await connection.disconnect();
  });
});
