const router = require('express').Router();
const db = require('./db');
const _ = require('lodash');

// get user data
router.get('/userData', (req, res, next) => {
  if (req.session.userID) { // if user logged in
    const _id = req.session.userID;
    db.Users.findOne({ _id })
      .then((data) => {
        res.send(data);
      })
      .catch(err => next(`/userData GET error: ${err}`));
  } else { // if user not logged in
    res.send(null);
  }
});

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
      res.redirect('/');
    })
    .catch(err => next(`/login POST error: ${err}`));
});

// log out
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// add a credit card
router.post('/users/:username/addcard', (req, res, next) => {
  if (req.session.userID) {
    const _id = req.session.userID;
    const name = `x-${req.body.number % 10000}`;
    const card = { ...req.body, name };
    db.Users.findOneAndUpdate({ _id }, { $addToSet: { cards: card } })
      .then(() => res.send())
      .catch(err => next(`/users/:username/addcard POST error: ${err}`));
  } else {
    next('/users/:username/addcard POST error: user not logged in');
  }
});

// handle all non-api requests by redirecting to index
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
