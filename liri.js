
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
            
        case "concerts-this":
            bands(search);
            break;
    }

}

// console.log(searches);

function spotifySearch(search) {

    
    if (!search) {
        search = 'Stressed Out'
    }
    
    spotify.search({
        type: 'track',
        query: search,
        limit: 5
    }, function (err, data) {
            
        if (err) {
            return console.log("Hey there's an error" + err);
        } else {
            
            
            // for (let i = 0; i < 5; i++) {

            // var results = data.tracks;
            // console.log(results);
            // for (let i = 0; i < 5; i++){
                var results = data.tracks.items[0];
                data = [
                    'Song: ' + results.name,
                    'Album: ' + results.album.name,
                    // 'Artist: ' + results.items[i].artists[i].name,
                    
                    'Artist: ' + results.album.artists[0].name
                ]
                    // console.log('were in ' + songSearch);
                    
                console.log(data);
            // }

        }
            
    })   
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

function bands(search) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
          console.log("Artist: " + response.name);
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
            
        })

    
}
    
start(command, search);
