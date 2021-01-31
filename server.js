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

    return readFileAsync(__dirname + "/db/db.json", "utf8");

};

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
});

app.get("/api/notes", async function(req, res) {
    // var data = fs.readFile(__dirname + "/db.json", err => err ? console.error(err) : console.log("Success!"));
    var notes = [];
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
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/api/notes", async function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    await getNotes()
    .then(function(res){
        console.log(res);
        // res.json(newNote);
        notes = JSON.parse(res);
        console.log(notes);
        // console.log(typeof notes + ": " + notes);
        notes.push(newNote);
        console.log(typeof notes);
        data = JSON.stringify(notes);
        fs.writeFile(__dirname + "/db/db.json", data, err => err ? console.error(err) : console.log("New notes written successfully!"));
    })
    .catch(err => err ? console.error(err) : console.log("Post Successful!"));
    res.json(newNote);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});