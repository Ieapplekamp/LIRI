require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
// console.log(spotify);
var fs = require('fs');


function spotifySearch() {
    spotify.search({
        track: 'track',
        query: song
    }), function (err, data) {
        
    }
}