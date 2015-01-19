// Parse Request Setup
var parse  = require("co-body");

// Monogodb Setup
var monk  = require("monk");
var wrap  = require("co-monk");
var db    = monk("localhost/apiUsers");
var users = wrap(db.get("users"));

// Export users for use in tests
module.exports.users = users;

// Export our api user functions
module.exports.addUser = function *addUser() {

  // Yield to the process to retrieve the user object from post params
  var userFromRequest = yield parse(this);

  if (!userFromRequest.name) {
    this.throw(400, "name required");
  }

  // Yield to the process to insert a user
  var insertedUser = yield users.insert(userFromRequest);

  // Set location to the new rest resource
  this.set("location", "/user/" + insertedUser._id);

  // Set response code to OK/Success
  this.status = 200;

}

module.exports.getUser = function *getUser(id) {

  // Yield to the process to retrieve the user object from mongo
  var user = yield users.findById(id);

  // Set body to the user object
  this.body = user;

  // Set response code to OK/Success
  this.status = 200;

}

module.exports.updateUser = function *updateUser(id) {

  // Yield to the process to retrieve the user object from post params
  var userFromRequest = yield parse(this);

  // Update user with new user object
  yield users.updateById(id, userFromRequest);

  // Set location to this users rest resource
  this.set("location", "/user/" + id);

  // Set response code to OK/No Content Returned
  this.status = 204;

}

module.exports.deleteUser = function *deleteUser(id) {

  // Yield to the process to delete the user
  yield users.remove({_id : id});

  // Set response code to OK/Success
  this.status = 200;

}

