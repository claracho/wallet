const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: String,
  number: Number,
  type: String,
  firstName: String,
  lastName: String,
  expiration: Number,
  cvv: Number,
});

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  cards: [cardSchema],
});

const Users = mongoose.model('Users', userSchema);

const readCreateUser = username =>
  Users.findOne({ username })
    .then((user) => {
      if (!user) { // if user does not exist, create one
        return Users.create({
          username,
          cards: [],
        });
      }
      return user;
    })
    .catch(err => `database query error: ${err}`);

const readUser = userId =>
  Users.findOne({
    _id: userId,
  })
    .catch(err => `database query error: ${err}`);

const createCard = (userId, card) =>
  Users.findOneAndUpdate({
    _id: userId,
  }, {
    $addToSet: {
      cards: card,
    },
  }, {
    new: true,
  })
    .catch(err => `database query error: ${err}`);

const updateCard = (userId, cardId, card) =>
  Users.findOneAndUpdate({
    _id: userId,
    'cards._id': cardId,
  }, {
    $set: {
      'cards.$': card,
    },
  }, {
    new: true,
  })
    .catch(err => `database query error: ${err}`);

const deleteCard = (userId, cardId) =>
  Users.findOneAndUpdate({
    _id: userId,
  }, {
    $pull: {
      cards: {
        _id: cardId,
      },
    },
  }, {
    new: true,
  })
    .catch(err => `database query error: ${err}`);

module.exports = {
  readCreateUser,
  readUser,
  createCard,
  updateCard,
  deleteCard,
};
