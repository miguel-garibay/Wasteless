const cookieController = {};
const cookieParser = require('cookie-parser')
const Session = require('./SessionModel');

/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  res.cookie('secret', Math.ceil(Math.random() * 99), {
    httpOnly: true,
    secure: false,
    maxAge: 3452345
  })
  next();
}

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.ssid, {
    httpOnly: true,
    maxAge: 23452345,
  })
  next();
}

// checks if client has cookie/session id already exists in local storage
cookieController.hasCookie = (req, res, next) => {
    console.log('hitting CookieController?')
    Session.find({cookieId: req.cookies.ssid}, (err, data) => {
      if (err) next(err);
      if (data.length === 0) {
        return res.redirect('/login');
      } else {
        return next();
      }
    });
  };


module.exports = cookieController;
