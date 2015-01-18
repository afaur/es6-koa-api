// Require SuperTest
var request = require("supertest")

// Support for Yield Callbacks in test functions
var co = require("co");

// Convert required files from ES6 to ES5
require("6to5/register");

// Require our application (ES6)
var app = require("../src/app.js");

// Get users from our userFunctions module
var users = require("../src/user.js").users;

// Run the supertest agent
request = request.agent(app.listen());

// Run our tests
describe("Simple User Http CRUD API", function () {

  var a_user = {};

  // Clean up records before each it/test runs
  beforeEach(function (done) {
    a_user = { name: "Marcus", age: 42, height: 1.96 };
    done();
  });

  // Clean up records after describe block finishes
  after(function (done) {
    removeAll(done);
  });

  // Remove all records from the users collection
  var removeAll = function (done) {
    co(function *() {
      yield users.remove({})
    }).then(function () {
      done();
    });
  };

  it("adds new users", function (done) {
    request
      .post("/user")
      .send(a_user)
      .expect("location", /^\/user\/[0-9a-fA-F]{24}$/)
      .expect(200, done)
  });

  it("fails with validation error for users without a name", function (done) {
    // Remove name property from user object
    delete a_user.name;

    request
      .post("/user")
      .send(a_user)
      .expect("name required")
      .expect(400, done)
  });

  it("gets existing users by id", function (done) {
    co(function *() {
      // Insert test user in db
      var insertedUser = yield users.insert(a_user);

      // Get url to user
      var url = "/user/" + insertedUser._id;

      // Get via api
      request
        .get(url)
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .expect(/Marcus/)
        .expect(/1.96/)
        .expect(200, done);
    }).catch(function (e) {
      console.error(e);
    });
  });

  it("updates an existing user", function (done) {
    co(function *() {
      // Insert test user in db
      var insertedUser = yield users.insert(a_user);

      // Get url to user
      var url = "/user/" + insertedUser._id;

      // Put via api
      request
        .put(url)
        // Update user
        .send({ name: "Older Marcus", age: 43, height: 1.94 })
        // Expect same location url
        .expect("location", url)
        // Expect No Content Returned status
        .expect(204, done);
    }).catch(function (e) {
      console.error(e);
    });
  });

  it("deletes an existing user", function (done) {
    co(function *() {
      // Insert test user in db
      var insertedUser = yield users.insert(a_user);

      // Get url to user
      var url = "/user/" + insertedUser._id;

      // Delete via api
      request
        .del(url)
        // Expect OK/Success Status
        .expect(200, done);
    }).catch(function (e) {
      console.error(e);
    });
  });

});

