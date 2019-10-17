
require("dotenv").config();

var keys = require('./keys.js');

var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// console.log(spotify);
var fs = require('fs');
// console.log(keys.spotify);
var command = process.argv[2];
var search = process.argv.splice(3).join(' ');

function start(command, search) {
    switch (command) {
        case "spotify-this-song":
            
            spotifySearch(search);
            break;
        
        case "movies-this":
            omdbMovies(search);
            break;
            
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
                console.log('were in ' + songSearch);
            
                console.log('please for the love of god ' + data);
            }
        }
    )   
}

function omdbMovies(search) {

    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
          console.log("Release Year: " + response.data.Year);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
              } 
            
        }
        )
}

// function bands(search) {

//     var queryURL = "https://rest.bandsintown.com/artists/" + search + "?app_id=codingbootcamp";
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function (response) {
        
//     }

//     )
// }
    
start(command, search);
