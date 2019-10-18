
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
        
        case "movie-this":
            omdbMovies(search);
            break;
            
        case "concert-this":
            bands(search);
            break;
        case "do-what-it-says":
            doWhatItDo(search);
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
            
            // Can't get it to load more than one song. "items undefined"
            
            // for (let i = 0; i < 5; i++){
            var results = data.tracks.items[0];
            data = [
                'Song: ' + results.name,
                'Album: ' + results.album.name,
                'Artist: ' + results.album.artists[0].name,
                'Song-Preview: ' + results.preview_url
            ]
        
            console.log("--------------------------------------");    
            console.log(data);
            console.log("--------------------------------------");
            // }
            // console.log(data);
        }
            
    })   
}

function omdbMovies(search) {

    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {

            data = [
                ' * Movie Title: ' + response.data.Title,
                'Year Released: ' + response.data.Released,
                'Run Time: ' + response.data.Runtime,
                'IMDB Rating: ' + response.data.imdbRating,
                'Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value,
                'Country: ' + response.data.Country,
                'Language(s): ' + response.data.Language,
                'Actors: ' + response.data.Actors,
                'Plot: '+ response.data.Plot
            ]

            console.log("--------------------------------------");
            console.log(data);
            console.log("--------------------------------------");

        })
        .catch(function (error) {
            if (error.response) {
            
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);

              } 
            
        })
}

function bands(search) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events/?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            
            console.log("--------------------------------------");
            console.log("--------------------------------------");
            console.log('Next 5 Shows');
            
            for (var i = 0; i < 5; i++) {

                data = [
                    'Venue Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.region,
                    'Venue Name: ' + response.data[i].venue.name,
                    'Date: ' + moment(response.data[i].datetime).format('MM/DD/YY hh:mm A')
                ]
                
                console.log(data);
                console.log("--------------------------------------");

            }
            
           
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

// function doWhatItDo(search) {



// }
    
start(command, search);
