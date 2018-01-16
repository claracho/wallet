const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: String,
  number: Number,
  firstName: String,
  lastName: String,
  expiration: Number,
  cvv: Number,
});

const userSchema = new Schema({
  username: String,
  password: String,
  cards: [cardSchema],
});

// index by username

const Users = mongoose.model('User', userSchema);

// test out
const card = {
  name: 'x-1234',
  number: 1234123412341234,
  firstName: 'Clara',
  lastName: 'Clara',
  expiration: 1234,
  cvv: 123,
};
Users.create({
  username: 'Clara',
  password: 'Clara',
  cards: [card],
});

module.exports = {
  Users,
};
