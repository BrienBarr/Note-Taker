// Dependencies
// =============================================================
var express = require("express");
var fs = require("fs");
var path = require("path");
var util = require("util");
var app = express();

var PORT = process.env.PORT || 8080;

var readFileAsync = util.promisify(fs.readFile);

function getNotes(){

    return readFileAsync(__dirname + "/db.json", "utf8");

};

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", async function(req, res) {
    // var data = fs.readFile(__dirname + "/db.json", err => err ? console.error(err) : console.log("Success!"));
    var notes = ["Hot dog"];
    await getNotes()
    .then(function(res){
        notes = JSON.parse(res);
        console.log(notes);
        return notes;
    })
    .catch(err => err ? console.error(err) : console.log("Post Successful!"));
    console.log(notes);
    res.json(notes);
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});