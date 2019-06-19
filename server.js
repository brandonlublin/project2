require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./project2app/models");
var path = require("path");

var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// PORT for heroku or local
var PORT = process.env.PORT || 3000;
// separate port for socket
server.listen(80);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/project2app/public"));
app.use(express.static(path.join(__dirname, "/project2app/public")));

// Handlebar
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Socket setup & pass server
io.on("connection", function(socket) {
  console.log("made connection to socket: ", socket.id);
  socket.on("disconnect", function() {
    console.log("connection lost from socket: ", socket.id);
  });
});

// Routes
require("./project2app/routes/apiRoutes")(app);
require("./project2app/routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models --------------s----------------------/
db.sequelize.sync(syncOptions).then(function() {
  server = app.listen(PORT, function() {
    console.log(
      "==> 🌎 Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
