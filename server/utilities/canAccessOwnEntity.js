module.exports = (ownedRequired, currentUser, entityUser) => {
  if (!ownedRequired) {
    return true;
  }

  if (!currentUser || !currentUser._id || !entityUser || !entityUser._id) {
    return false;
  }

  return entityUser._id.toString() === currentUser._id.toString();
};