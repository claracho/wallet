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
  },
  cards: [cardSchema],
});

// index by username
// validation of cards

const Users = mongoose.model('Users', userSchema);


// READ or CREATE user
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


// READ user data, including username and user's cards
const readUser = userId =>
  Users.findOne({
    _id: userId,
  })
    .catch(err => `database query error: ${err}`);

// CREATE a credit card
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

// UPDATE a credit card
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

// DELETE a credit card
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
