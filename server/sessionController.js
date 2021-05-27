const Session = require('./SessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  Session.find({cookieId: res.locals.ssid}, (err, data) => {
    if (err) next(err);
    if (data.length === 0) {
      return res.redirect('/signup');
    } else {
      // console.log(data);
      // console.log(data[0]._id);
      // res.locals.ssid = data[0]._id;
      return next();
    }
  });
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  //write code here
  Session.create({'cookieId': res.locals.ssid})
    .then((data) => {
      // console.log('Session ID data: ', data);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    })
};

module.exports = sessionController;
