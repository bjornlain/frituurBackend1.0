// CONSTRUCTOR
module.exports = function(req, res, next) {
  const { json } = res;
  res.json = (obj) => {
    delete Object.assign(obj, { id: obj._id })._id;
    json.call(this, obj);
  };
  next();
};