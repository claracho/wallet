const router = require('express').Router();
const db = require('./db');

// get specific user data NEED TO AUTHENTICATE
router.get('/userData', (req, res) => {
  db.Users.findOne({ username: 'Clara' })
    .then((data) => {
      res.send(data);
    });
});

// sign up, create user

// log in
router.post('/login', (req, res) => {
  res.redirect('/');
});

// log out
router.get('/logout', (req, res) => {
  res.redirect('/');
});

// handle all non-api requests by redirecting to index
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
