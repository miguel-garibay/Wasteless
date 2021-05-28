const express = require('express');
const app = express();
const path = require('path');
const userController = require('./userController');
const apiRouter = require('./api');
const cookieController = require('./cookieController');
const sessionController = require('./sessionController');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/login.html')));
// app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/signup.html')));

app.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  // what should happen here on successful log in?
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/signup', (req,res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/signup.html'));
})

app.post('/signup', userController.createUser, (req, res) => {
  // what should happen here on successful log in?
  res.status(200).sendFile(path.resolve(__dirname, '../client/login.html'));
});

//  will be tested after login verification

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