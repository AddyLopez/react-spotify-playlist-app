const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = "http://localhost:3000/";

let accessToken;
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      // If user's access token is already set, simply return the access token.
      return accessToken;
    }

    const tokenIsMatch = window.location.href.match(/accesstoken=([^&]*)/); //window.location.href grabs the URL of the current page
    const expirationIsSet = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenIsMatch && expirationIsSet) {
      // If access token is not already set, check the URL to see if token has just been obtained and is set to expire.
      console.log(
        `tokenIsMatch: ${tokenIsMatch[1]}, expirationIsSet: ${expirationIsSet[1]}`
      );
      accessToken = tokenIsMatch[1]; // Assign token to the token obtained from the URL
      const expiration = Number(expirationIsSet[1]);
      window.setTimeout(() => (accessToken = ""), expiration * 1000); // The callback function will execute at the time it's set to expire (in milliseconds)
      window.history.pushState("Access Token", null, "/"); // From solution code: "This clears the parameters, allowing us to grab a new access token when it expires.""
      return accessToken;
    } else {
      // If access token variable is empty and not in the URL, then redirect user to Spotify to login.
      const apiURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = apiURL;
    }
  },
  search(searchTerm) {
    // might need to refactor to a promise chain using the then method.
    const token = Spotify.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        if (!json.tracks) {
          return [];
        } else {
          const tracks = json.tracks.items.map((item) => {
            return {
              id: item.id,
              name: item.name,
              artist: item.artists[0].name,
              album: item.album.name,
              uri: item.uri,
            };
          });
          console.log(tracks);
          return tracks;
        }
      });
  },
  savePlaylist(playlistTitle, trackURIs) {
    if (!playlistTitle || !trackURIs) {
      return;
    }
    const token = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let userID;
    //get current user's id
    return fetch("https://api.spotify.com/v1/me", {
      headers: headers,
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        userID = json.id;
        //post playlist's title to current user's account
        return fetch(`https://api.spotify.com/v1/${userID}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: playlistTitle }),
        })
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((json) => {
            //post track uri's to playlist newly entitled on current user's account
            const playlistID = json.id;
            return fetch(
              `https://api.spotify.com/v1/${userID}/playlists/${playlistID}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackURIs }),
              }
            );
          });
      });
  },
};

export default Spotify;
