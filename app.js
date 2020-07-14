// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"))
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"))
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "notes.html"))
});

// Create New reservation - takes in JSON input
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

  // newReservation.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  if (tables.length < 5) {
    tables.push(newReservation);
    res.send("Table")
  } else {
    waitingList.push(newReservation);
    res.send("Waitlist")
  }


});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});