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
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", async function(req, res) {
    var notes = [];
    await getNotes()
    .then(function(res){
        notes = JSON.parse(res);
        return notes;
    })
    .catch(err => err ? console.error(err) : console.log("Post Successful!"));
    res.json(notes);
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", async function(req, res) {
    var newNote = req.body;
    await getNotes()
    .then(function(res){
        notes = JSON.parse(res);
        notes.push(newNote);
        data = JSON.stringify(notes);
        fs.writeFile(__dirname + "/db/db.json", data, err => err ? console.error(err) : console.log("New notes written successfully!"));
    })
    .catch(err => err ? console.error(err) : console.log("Post Successful!"));
    res.json(newNote);
});

app.delete("/api/notes/:id", async function(req, res) {
    console.log(req.params.id);
    var noteID = req.params.id;
    await getNotes()
    .then(function(res){
    notes = JSON.parse(res);
    console.log(notes);
    // find noteID in notes
    for(i = 0; i < notes.length; i++){
        if (notes[i].id === noteID){
            var noteIndex = i;
            console.log(noteIndex);
        }
    }
    // delete noteID
    notes.splice(noteIndex, 1);
    console.log(notes);
    // write notes to db.json
    data = JSON.stringify(notes);
    fs.writeFile(__dirname + "/db/db.json", data, err => err ? console.error(err) : console.log("Success!"));
    })
    .catch(err => err ? console.error(err) : console.log("Get Note to Delete Successful!"));
    res.json(notes)
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});