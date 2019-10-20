# LIRI

LIRI is a node.js application that searches Spotify, OMDB, and the Bands in Town APIs. To use, clone the repo, and make sure all packages are aquired. Reference the _Technologies Used_. Users are **REQUIRED** to created their own spotify api key.

**Technologies Used**
```
   * Node.js
   * fs
   * Node-Spotify-API
   * Axios
   * Moment.js
   * DotEnv
   * chalk
   * wrapAnsi
```

## Spotify Search

```
node liri.js spotify-this-song <Song Name>
```

Renders the first 5 results related to the song searched from the Spotify API using the ```node-spotify-api``` npm; Artists names can usually be included. Each result should return the name of the song, album, artist, and a link to preview the song will be provided, if there is one.

![Spotify Default](https://media.giphy.com/media/d9NqL931hX0Orh8OTP/giphy.gif)


## Movie Search 

```
node liri.js movie-this <Movie Name>
```

Returns all the meta data about the movie searched through the OMDB API, if not specifed the result will return "Howl's Moving Castle" as a default. 

![Moives Default](https://media.giphy.com/media/Ig9CnhTX4Lb4W7WEEr/giphy.gif)


## Concert Search

```
node liri.js concert-this <Artist>
```

Renders the next 5 concerts or shows for the _Artist_ searched, along with the venue, location, and time of the performance. If not artist is specified, Ari Lennox will be chosen for you. _highly recommended_

![Concerts Default](https://media.giphy.com/media/UQIdAfitHDfO3k7jlE/giphy.gif)


## spotify log text

ALL successful commands will be appended to the log.txt file for user reciepts of command results; Files will also include a time stamp. 

![Spotify Log](https://media.giphy.com/media/SUDyYhYyFWiV9fflqr/giphy.gif) ![Concerts Log](https://media.giphy.com/media/LPThjetG2P85JQ98R5/giphy.gif) ![Moive and DoWhatItDo](https://media.giphy.com/media/ZecJ0Z1JWnv6Jmu7Ij/giphy.gif)


## Spotify API Set Up

1. Visit https://developer.spotify.com/dashboard/login
2. Create an account or login with an existing account. (Premium Not Required)
3. Once you login, you should see an option to create a new application, create it.
4. The next screen, copy the client id AND client secret.
5. In the liri folder create a file named '.env' and format it like this: SPOTIFY_ID=client-ID-here SPOTIFY_SECRET=secret-ID-here
6. Save and run the ```spotify-this-song``` command.


#### To Read the random.txt file

```
node liri.js do-what-it-says 
```

_do-what-it-says_ command will read and render a pre-definded spotify search result from the random.txt file.

