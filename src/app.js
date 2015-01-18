// Server Setup (exports for testing)
var koa    = require("koa");
var app    = module.exports = koa();

// Parse request Setup
var routes = require("koa-route");

// Import user functions
var userFunctions = require("./user.js");

// Middleware Setup
app.use( routes.post( "/user",     userFunctions.addUser    ) );
app.use( routes.get(  "/user/:id", userFunctions.getUser    ) );
app.use( routes.put(  "/user/:id", userFunctions.updateUser ) );
app.use( routes.del(  "/user/:id", userFunctions.deleteUser ) );

// Start Server
app.listen(3000);
console.log("The app is listening on port 3000.");

// Middleware Functions

