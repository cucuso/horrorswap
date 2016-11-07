var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');

var port = process.env.PORT || 8080;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.set('superSecret', 'CucuSo'); // secret variable



// get an instance of the router for api routes
var apiRoutes = express.Router();

// =======================
// routes ================
// =======================
apiRoutes.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

apiRoutes.get('/setup', function (req, res) {
  // create a sample user
  var nick = new User({
    email: 'test@test.com',
    password: '123'
  });
  // save the sample user
  nick.save(function (err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function (req, res) {
  // find the user
  User.findOne({
    email: req.body.email
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });
        // if user is found and password is right
        // create a token
        // var token = jwt.sign(user, app.get('superSecret'), {
        //   expiresInMinutes: 1440 // expires in 24 hours
        // });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});


// route middleware to verify a token
apiRoutes.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (req, res) {
  // -doc gives you access to user object
  console.log('this is the decoded token:',req.decoded._doc.email);
  User.find({}, function (err, users) {
    res.json(users);
  });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
app.listen(port);
console.log('Magic happens at http://localhost:' + port);