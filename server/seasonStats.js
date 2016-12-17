/**
 * Created by sachin on 17/12/16.
 */
var seasonData={};
var http = require("http");
http.get('http://stats.nba.com/js/data/widgets/home_season.json', function(res){
    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    var error;
    if (statusCode !== 200) {
        error = new Error("Request Failed.\n` +`Status Code: ${statusCode}");
    } else if (!/^text\/plain/.test(contentType)) {
        error = new Error("Invalid content-type.\n` + `Expected application/json but received "+contentType);
    }
    if (error) {
        console.log(error.message);
        // consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    var rawData = '';
    res.on('data', function(chunk){rawData += chunk});
    res.on('end', function(){
        try {
            seasonData = JSON.parse(rawData).items[0].items;
        } catch (e) {
            console.log(e.message);
        }
    });
}).on('error', function(e){
    console.log("Got error: "+e.message+"}");
});

module.exports = function (app) {
    app.get("/getSeasonTeam",function (req,res) {
        res.send(seasonData);
    });

};