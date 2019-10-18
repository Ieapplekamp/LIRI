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

const chalk = require('chalk');
var white = chalk.hex('#ffffff');
var blue = chalk.hex('#7FE5F0');
var pink = chalk.hex('#FF8A9A');

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
            
            // for (let i = 0; i <= 2; i++){

                var results = data.tracks.items[0];
                
                if (results.preview_url === null) {

                    dataRevisedColor = [
                        white("\n ------------------| SPOTIFY |--------------------\n") +
                        blue('* Song: ') + pink(results.name) +  
                        blue('\n * Album: ') + pink(results.album.name) + 
                        blue('\n * Artist: ') + pink(results.album.artists[0].name) + 
                        blue('\n * Song-Preview: ') +  pink('This artist is too much of a diva to share their work :(') + 
                        white("\n ------------------| SPOTIFY |--------------------\n")
                    ]

                    dataRevised = [
                        "\n ------------------| SPOTIFY |--------------------\n" +
                        '\n * Song: ' + results.name +
                        '\n * Album: ' + results.album.name + 
                        '\n * Artist: ' + results.album.artists[0].name + 
                        '\n * Song-Preview: This artist is too much of a diva to share their work :(' + 
                        "\n ------------------| SPOTIFY |--------------------\n"
                    ]

                    console.log("--------------------------------------");
                    console.log(wrapAnsi(dataRevisedColor));
                    console.log("--------------------------------------");

                    fs.appendFile('log.txt', dataRevised, function (err) {
                        
                        if (err) {
                            return console.log(err);
                        } 

                    });

                } else {

                    dataColor = [
                        white("\n ------------------| SPOTIFY |--------------------\n") +
                        blue('\n * Song: ') + pink(results.name) +
                        blue('\n * Album: ') + pink(results.album.name) +
                        blue('\n * Artist: ') + pink(results.album.artists[0].name) +
                        blue('\n * Song-Preview: ') + '\n' + pink(results.preview_url) + '\n' + '\n' +
                        white("\n ------------------| SPOTIFY |--------------------\n")
                    ]

                    data = [
                        '\n * Song: ' + results.name,
                        '\n * Album: ' + results.album.name,
                        '\n * Artist: ' + results.album.artists[0].name,
                        '\n * Song-Preview: ' + results.preview_url
                    ]
            
        
                    console.log("\r\n");
                    console.log(wrapAnsi(dataColor));
                    // logs results to log.txt
                    

                    fs.appendFile('log.txt', data, function (err) {
                    
                        if (err) {
                        return console.log(err);
                        } 
    
                    });
                }
            
            // }
            // console.log(data);
        }
            
    })   
}

function omdbMovies(search) {

    if (!search) {
        search = 'Holes'
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {

            dataColor = [
                white("\n ------------------| MOVIES |--------------------\n") +
                blue('\n * Movie Title: ') + pink(response.data.Title) + 
                blue('\n * Year Released: ') + pink(response.data.Released) + 
                blue('\n * Run Time: ') + pink(response.data.Runtime) + 
                blue('\n * IMDB Rating: ') + pink(response.data.imdbRating) + 
                blue('\n * Rotten Tomatoes Rating: ') + pink(response.data.Ratings[1].Value) + 
                blue('\n * Country: ') + pink(response.data.Country) + 
                blue('\n * Language(s): ') + pink(response.data.Language) + 
                blue('\n * Actors: ') + pink(response.data.Actors) + 
                blue('\n * Plot: ') + pink(response.data.Plot) + 
                white("\n ------------------| MOVIES |--------------------\n")
            ]
            
            data = [
                '\n * Movie Title: ' + response.data.Title,
                '\n * Year Released: ' + response.data.Released,
                '\n * Run Time: ' + response.data.Runtime,
                '\n * IMDB Rating: ' + response.data.imdbRating,
                '\n * Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value,
                '\n * Country: ' + response.data.Country,
                '\n * Language(s): ' + response.data.Language,
                '\n * Actors: ' + response.data.Actors,
                '\n * Plot: '+ response.data.Plot

            ]

            console.log("--------------------------------------");
            console.log(dataColor);
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
    
        fs.appendFile('log.txt', data, function (err) {
            
            if (err) {
            return console.log(err);
            } 

        });
}

function bands(search) {

    if (!search) {
        search = 'Twenty One Pilots'
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events/?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function(response) {
            
            console.log("\r\n");
            console.log("--------------------------------------");
            console.log("\r\n");
            console.log(chalk.underline('Next 5 shows for ' + search + ':'));
            console.log("\r\n");

            for (var i = 0; i < 5; i++) {

                dataColor = [
                    white("\n ------------------| CONCERTS |--------------------\n") +
                    blue('\n * Venue Location: ') + pink(response.data[i].venue.city) + ', ' + pink(response.data[i].venue.region) +
                    blue('\n * Venue Name: ') + pink(response.data[i].venue.name) +
                    blue('\n * Date: ') +pink(moment(response.data[i].datetime).format('MM/DD/YY hh:mm A'))
                ]

                data = [
                    "\n ------------------| CONCERTS |--------------------\n" +
                    '\n * Venue Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.region,
                    '\n * Venue Name: ' + response.data[i].venue.name,
                    '\n * Date: ' + moment(response.data[i].datetime).format('MM/DD/YY hh:mm A') + 
                    "\n ------------------| CONCERTS |--------------------\n"
                ]
                
                console.log(wrapAnsi(dataColor));
                console.log("\r\n");
                console.log("--------------------------------------");

                fs.appendFile('log.txt', data, function (err) {
                    
                    if (err) {
                    return console.log(err);
                    } 

                });

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


// Things To do 


// 3) try to make it look a bit prettier -- mostly check
// 4) continue working on the spotify api for more results 