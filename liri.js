
require("dotenv").config();

var keys = require('./keys.js');

var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// console.log(spotify);
var fs = require('fs');
console.log(keys.spotify);
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
        type: 'track',
        query: search,
        limit: 5
        }, function (err, data) {
        
            if (err) {
                return console.log("Hey there's an error" + err);
            } else {
                var results = data.tracks.items[0];

                data = [
                    'Artist: ' + results.artists[0].name,
                    'Song: ' + results.name
                ]
                console.log('were in' + songSearch);
            
                console.log('please for the love of god' + data);
            }
        }
    )   
}
start(command, search);
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }