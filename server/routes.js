const router = require('express').Router();

let user = null;

// get specific user data NEED TO AUTHENTICATE
router.get('/userData', (req, res) => {
  res.send(user);
});

// sign up, create user

// log in
router.post('/login', (req, res) => {
  const { username } = req.body;
  user = { username, cards: [{ id: 1, number: 1234123412341234 }] };
  res.redirect('/');
});

// log out
router.get('/logout', (req, res) => {
  user = null;
  res.redirect('/');
});

// handle all non-api requests by redirecting to index
router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
