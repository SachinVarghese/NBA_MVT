var express = require('express');
var app = express();


var dailyStats = require("./server/dailyStats.js")(app);
var seasonStats = require("./server/seasonStats.js")(app);
app.use('/',express.static('./public'));
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});