const router = require('express').Router();
const db = require('./db');
const _ = require('lodash');

// log in and sign up
router.post('/login', (req, res, next) => {
  const { username } = req.body;
  db.Users.findOne({ username })
    .then((user) => {
      if (!user) { // if user does not exist, create one
        return db.Users.create({
          username,
          cards: [],
        });
      }
      return user;
    })
    .then((user) => { // assign userID to req.session
      req.session.userID = user._id;
      res.send(user);
    })
    .catch(err => next(`/login POST error: ${err}`));
});

// log out
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.end();
});

// READ user data, which includes username and all card information
router.get('/userData', (req, res, next) => {
  if (req.session.userID) { // if user logged in
    const _id = req.session.userID;
    db.Users.findOne({ _id })
      .then((user) => {
        res.send(user);
      })
      .catch(err => next(`/userData GET error: ${err}`));
  } else { // if user not logged in
    res.send(null);
  }
});

// CREATE a credit card
router.post('/users/:username/cards', (req, res, next) => {
  if (req.session.userID) {
    const _id = req.session.userID;
    const name = `x-${req.body.number % 10000}`;
    const card = { ...req.body, name };
    db.Users.findOneAndUpdate({ _id }, { $addToSet: { cards: card } }, { new: true })
      .then((user) => {
        res.send(user);
      })
      .catch(err => next(`/users/:username/cards POST error: ${err}`));
  } else {
    next('/users/:username/cards POST error: user not logged in');
  }
});

// UPDATE a credit card
router.put('/users/:username/cards/:id', (req, res, next) => {
  if (req.session.userID) {
    const _id = req.session.userID;
    const cardId = req.params.id;
    const name = `x-${req.body.number % 10000}`;
    const card = { ...req.body, _id: cardId, name };
    db.Users.findOneAndUpdate({ _id, 'cards._id': cardId }, { $set: { 'cards.$': card } }, { new: true })
      .then((user) => {
        res.send(user);
      })
      .catch(err => next(`/users/:username/cards PUT error: ${err}`));
  } else {
    next('/users/:username/cards PUT error: user not logged in');
  }
});

// DELETE a credit card
router.delete('/users/:username/cards/:id', (req, res, next) => {
  if (req.session.userID) {
    const _id = req.session.userID;
    const cardId = req.params.id;
    db.Users.findOneAndUpdate({ _id }, { $pull: { cards: { _id: cardId } } }, { new: true })
      .then((user) => {
        res.send(user);
      })
      .catch(err => next(`/users/:username/cards DELETE error: ${err}`));
  } else {
    next('/users/:username/cards DELETE error: user not logged in');
  }
});

// handle all non-api requests by redirecting to index
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
