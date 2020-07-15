// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Helpers
function randomId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// Routes
// =============================================================

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

app.post("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    req.body.id = randomId();
    notes.push(req.body);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      else res.json({ msg: "Success" });
    });
  });
});

app.delete("/api/notes/:id", function (req, res) {
  var deleteId = req.params.id;
  console.log(deleteId);
  fs.readFile(__dirname + "/db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    var updatedNotes = notes.filter(({ id }) => id !== deleteId);
    var stringNotes = JSON.stringify(updatedNotes);

    fs.writeFile(__dirname + "/db/db.json", stringNotes, (err) => {
      if (err) throw err;
      else res.json({ msg: "Success" });
    });
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});
