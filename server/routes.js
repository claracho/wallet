const router = require('express').Router();
const db = require('./db');
const _ = require('lodash');

// LOG IN and SIGN UP
router.post('/login', (req, res, next) => {
  const { username } = req.body;
  db.readCreateUser(username)
    .then((user) => { // assign userID to req.session
      req.session.userId = user._id;
      res.send(user);
    })
    .catch(err => next(`/login POST error: ${err}`));
});

// LOG OUT
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.end();
});

// READ user data, including username and user's cards
router.get('/userData', (req, res, next) => {
  if (req.session.userId) { // if user logged in
    const { userId } = req.session;
    db.readUser(userId)
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
  if (req.session.userId) {
    const { userId } = req.session;
    const name = `X-${req.body.number.toString().substr(-4)}`;
    const card = { ...req.body, name };
    db.createCard(userId, card)
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
  if (req.session.userId) {
    const { userId } = req.session;
    const cardId = req.params.id;
    const name = `X-${req.body.number.toString().substr(-4)}`;
    const card = { ...req.body, _id: cardId, name };
    db.updateCard(userId, cardId, card)
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
  if (req.session.userId) {
    const { userId } = req.session;
    const cardId = req.params.id;
    db.deleteCard(userId, cardId)
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
