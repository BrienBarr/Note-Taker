// Dependencies
// =============================================================
var express = require("express");
var fs = require("fs");
var path = require("path");
var util = require("util");
var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});