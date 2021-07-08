const express = require('express');
const app = express();
const path = require('path');
const userController = require('./userController');
const apiRouter = require('./api');
const cookieController = require('./cookieController');
const sessionController = require('./sessionController');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// statically serve 
app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));
// run the cookie parser
app.use(cookieParser());

// serve index.html on the route '/'
// landing page redirect to login or serve index if cookie exists
app.get('/', cookieController.hasCookie, (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));

// direct to index if login is valid
app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// directs you to login page 
app.get('/login', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/login.html'));
});

// directs you to signup page
app.get('/signup', (req,res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/signup.html'));
})

// signup sends user input to database then directs to login page
app.post('/signup', userController.createUser, (req, res) => {
  // what should happen here on successful log in?
  res.status(200).sendFile(path.resolve(__dirname, '../client/login.html'));
});

app.use('/api', apiRouter);

// route error handler is unknown
app.use((req, res) => res.status(404).send("This is not the page you're looking for..."));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
  next();
});

app.listen(3000); 
// listens on port 3000 -> http://localhost:3000/
// module.exports = app;