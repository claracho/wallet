const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const _ = require('lodash');
const router = require('./routes');

const app = express();

// middleware - serve static assets
app.use(express.static(path.resolve(__dirname, '../public/')));

// middleware - logging, body parsing, cors header
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// router
app.use('/', router);

// middleware - error handler
app.use((err, req, res, next) => {
  if (err) res.status(500).send(err);
  next();
});

// listen to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
