const cookieController = {};

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

module.exports = cookieController;
