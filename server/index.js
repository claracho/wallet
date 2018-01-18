const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

app.use(express.static(path.resolve(__dirname, '../public/')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: 'cho wallet cat',
  cookie: { maxAge: 5 * 60 * 1000 }, // 5 min
  resave: false,
  saveUninitialized: false,
}));

app.use('/', router);

app.use((err, req, res, next) => {
  console.log(err);
  if (err) res.status(500).send(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
