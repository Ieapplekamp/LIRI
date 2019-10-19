require("dotenv").config();
// spotify key export
var keys = require('./keys.js');

var axios = require('axios');
var moment = require('moment');

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require('fs');

var command = process.argv[2];
var search = process.argv.splice(3).join(' ');

// Chalk console.log's colors 
const chalk = require('chalk');
var white = chalk.hex('#ffffff');
var blue = chalk.hex('#ff57ab'); // Actually Pink
var pink = chalk.hex('#7FE5F0'); // Roles reversed
// wrapAnsi formats logs
const wrapAnsi = require('wrap-ansi');


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


function spotifySearch(search) {

    if (!search) {
        search = 'Ask for Love'
    }
    
    spotify.search({
        type: 'track',
        query: search,
        limit: 5
    }, function (err, data) {

        
        if (err) {
            return console.log('Something went wrong ~ ' + err);
        } else {
            // console.log(data.tracks.items[1],'items')
            
            for (var i = 0; i < 5; i++){
                var results = data.tracks.items[i];
                // console.log(results, 'res');
                if (results.preview_url === null) {

                    var dataRevisedColor = [
                        white("\n ------------------| SPOTIFY |--------------------") + "\r\n" +
                        blue('* Song: ') + pink(results.name) +  
                        blue('\n * Album: ') + pink(results.album.name) + 
                        blue('\n * Artist: ') + pink(results.album.artists[i].name) + 
                        blue('\n * Song-Preview: ') +  pink('This artist is too much of a diva to share their work :(') + "\r\n" + 
                        chalk.white.dim("\n ------------------| SPOTIFY |--------------------\n")
                    ]

                    var dataRevised = [
                        "\n" + moment().toDate() + 
                        "\n ------------------| SPOTIFY |--------------------\n" + 
                        '\n * Song: ' + results.name +
                        '\n * Album: ' + results.album.name + 
                        '\n * Artist: ' + results.album.artists[i].name + 
                        '\n * Song-Preview: This artist is too much of a diva to share their work :(' + "\r\n" + 
                        "\n -------------------------------------------------\n"
                    ]

                    console.log(wrapAnsi(dataRevisedColor));

                    fs.appendFile('log.txt', dataRevised, function (err) {
                        
                        if (err) {
                            return console.log('Something went wrong ~ ' + err);
                        } 

                    });

                } else {

                    var dataColor = [
                        white("\n ------------------| SPOTIFY |--------------------") + "\r\n" +
                        blue('\n * Song: ') + pink(results.name || 'NO DATA') +
                        blue('\n * Album: ') + pink(results.album.name || '') +
                        blue('\n * Artist: ') + pink(results.album.artists[0].name || '') +
                        blue('\n * Song-Preview: ') + '\n' + pink(results.preview_url || '') + "\r\n" +
                        chalk.white.dim("\n ------------------| SPOTIFY |--------------------\n")
                    ]

                    var dataNew = [
                        "\n" + moment().toDate() + 
                        "\n ------------------| SPOTIFY |--------------------\n" + 
                        '\n * Song: ' + results.name  || 'NO DATA',
                        '\n * Album: ' + results.album.name || 'NO DATA',
                        '\n * Artist: ' + results.album.artists[0].name || 'NO DATA',
                        '\n * Song-Preview: ' + results.preview_url || 'NO DATA' + "\r\n" + 
                        "\n -------------------------------------------------\n"
                    ]
            
                    console.log(wrapAnsi(dataColor));

                    fs.appendFile('log.txt', dataNew, function (err) {
                    
                        if (err) {
                        return console.log('Something went wrong ~ ' + err);
                        } 

                    });

                }
            
            }
        
        }
            
    })
    
}

function omdbMovies(search) {

    if (!search) {
        search = "Howl's Moving Castle"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {

            var dataColor = [
                white("\n ------------------| MOVIE |--------------------") + 
                blue('\n * Movie Title: ') + pink(response.data.Title) + 
                blue('\n * Year Released: ') + pink(response.data.Released) + 
                blue('\n * Run Time: ') + pink(response.data.Runtime) + 
                blue('\n * IMDB Rating: ') + pink(response.data.imdbRating) + 
                blue('\n * Rotten Tomatoes Rating: ') + pink(response.data.Ratings[1].Value) + 
                blue('\n * Country: ') + pink(response.data.Country) + 
                blue('\n * Language(s): ') + pink(response.data.Language) + 
                blue('\n * Actors: ') + pink(response.data.Actors) + 
                blue('\n * Plot: ') + pink(response.data.Plot) + "\r\n" +
                chalk.white.dim("\n ------------------| MOVIE |--------------------\n")
            ]
            
            var data = [
                "\n" + moment().toDate() + 
                "\n ------------------| MOVIE |--------------------\n" + 
                '\n * Movie Title: ' + response.data.Title,
                '\n * Year Released: ' + response.data.Released,
                '\n * Run Time: ' + response.data.Runtime,
                '\n * IMDB Rating: ' + response.data.imdbRating,
                '\n * Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value,
                '\n * Country: ' + response.data.Country,
                '\n * Language(s): ' + response.data.Language,
                '\n * Actors: ' + response.data.Actors,
                '\n * Plot: ' + response.data.Plot + "\r\n" + 
                "\n ------------------------------------------------\n"
            ]

            console.log(wrapAnsi(dataColor));

            fs.appendFile('log.txt', data, function (err) {
            
                if (err) {
                return console.log('Something went wrong ~ ' + err);
                } 
    
            });

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

    if (!search) {
        search = 'Ari Lennox'
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events/?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function(response) {
            
            console.log("\r\n");
            console.log(chalk.bold.white.underline('Next 5 shows for ' + search + ':'));

            if (response.data.length === 0) {
                console.log("\r\n");
                console.log(chalk.italic.inverse.white("Sorry, I cannot find any concerts for this artist right now") + "\r\n");
            }
            
            for (var i = 0; i < 5; i++) {

                var dataColor = [
                    white("\n ------------------| " + search.toUpperCase() + " CONCERTS |--------------------\n") +
                    blue('\n * Venue Location: ') + pink(response.data[i].venue.city) + ', ' + pink(response.data[i].venue.region) +
                    blue('\n * Venue Name: ') + pink(response.data[i].venue.name) +
                    blue('\n * Date: ') + pink(moment(response.data[i].datetime).format('MM/DD/YY hh:mm A')) + "\r\n" + 
                    chalk.white.dim("\n --------------------------------------")
                ]

                var data = [
                    "\n" + moment().toDate() + 
                    "\n ------------------| " + search.toUpperCase() + " CONCERTS |--------------------\n" +
                    '\n * Venue Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.region,
                    '\n * Venue Name: ' + response.data[i].venue.name,
                    '\n * Date: ' + moment(response.data[i].datetime).format('MM/DD/YY hh:mm A') + "\r\n" +
                    "\n --------------------------------------" + "\r\n"
                ]
                
                console.log(wrapAnsi(dataColor));
            
                fs.appendFile('log.txt', data, function (err) {
                    
                    if (err) {
                    return console.log('Something went wrong ~ ' + err);
                    } 

                }); 

            } console.log('\n');
            
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

function doWhatItDo(search) {

    fs.readFile('.random.txt', 'utf-8', function (err, data) {

        if (err) {
            return console.log('Something went wrong ~ ' + err);
        } else {

            var splitData = data.split(",");
            search = splitData[1];
            spotifySearch(search);
            
        }

    })

}
    
start(command, search);