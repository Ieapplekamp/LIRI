# LIRI

LIRI is a node.js application that searches Spotify, OMDB, and the Bands in Town APIs.

**Technologies Used**
```
   - Node.js
   - fs
   - Node-Spotify-API
   - Axios
   - Moment.js
   - DotEnv
   - chalk
   - wrapAnsi
```

## Spotify

```
node liri.js spotify-this-song _Song Name_
```

Renders the first 5 results related to the song searched from the Spotify API using the ```node-spotify-api``` npm; Artists names can usually be included. Each result should return the name of the song, album, artist, and a link to preview the song will be provided if there is one.

![Spotify Default](https://media.giphy.com/media/d9NqL931hX0Orh8OTP/giphy.gif)


## Movie 

```
node liri.js movie-this _Movie Name_
```

Returns all the meta data about the movie searched through the OMDB API, if not specifed the result will return "Howl's Moving Castle". 

![Moives Default](https://media.giphy.com/media/Ig9CnhTX4Lb4W7WEEr/giphy.gif)


## Concert 

```
node liri.js concert-this _Artist_
```

Renders the next 5 concerts or shows for the _Artist_ searched, along with the venue, location, and time of the performance.

![Concerts Default](https://media.giphy.com/media/UQIdAfitHDfO3k7jlE/giphy.gif)


## spotify log text

ALL successful commands will be appended to the log.txt file for user reciepts of command results; Files will also include a time stamp. 

![Spotify Log](https://media.giphy.com/media/SUDyYhYyFWiV9fflqr/giphy.gif) ![Concerts Log](https://media.giphy.com/media/LPThjetG2P85JQ98R5/giphy.gif) ![Moive and DoWhatItDo](https://media.giphy.com/media/ZecJ0Z1JWnv6Jmu7Ij/giphy.gif)
