// REQUIRES
const BearerStrategy = require('passport-http-bearer').Strategy;
const passport = require('passport');

const { jwt } = require('../utilities');
const { User } = require('../models');


// CONSTRUCTOR
module.exports = function(req, res, next) {
  // PASSPORT INITIALIZE
  passport.initialize();

  // PASSPORT STRATEGIES
  passport.use(new BearerStrategy(async (accessToken, callback) => {
    let payload; try { payload = await jwt.verify(accessToken); } catch (err) { return callback(false, false); }
    const user = await User.findById(payload._id);
    if (!user || user.deleted || !user.isApproved()) return callback(false, false);
    return callback(false, user);
  }));

  // PASSPORT AUTHENTICATE
  passport.authenticate('bearer', (err, user) => {
    if (err) return next(err);
    if (!user) return next(false);
    return req.logIn(user, { session: false }, (error) => next(error, user));
  })(req, res, next);
};