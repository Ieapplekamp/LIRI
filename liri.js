require("dotenv").config();

var keys = require('./keys.js');

var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// console.log(spotify);
var fs = require('fs');

var command = process.argv[2];
var search = process.argv.splice(3).join(' ');

function start(command, search) {
    switch (command) {
        case "spotify-this-song":
            
            spotifySearch(search);
            break;
            // case: 
            
    }

}



// console.log(searches);

function spotifySearch(songSearch) {

    if (!songSearch) {
        songSearch = 'Stressed Out'
    }

    spotify.search({
        track: 'track',
        query: songSearch,
    }), function (err, data) {
        if (err) {
            return console.log("Hey there's an error" + err);
        } else {
            var results = data.tracks.items[i];

            data = [
                'Artist: ' + results.artists[i].name,
                'Song: ' + results.name
            ].join('\n\n');
            console.log(data);

            
            
        } console.log(data);
    }
}
start(command, search);