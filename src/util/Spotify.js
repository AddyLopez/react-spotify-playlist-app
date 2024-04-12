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
  async search(searchTerm) {
    // might need to refactor to a promise chain using the then method.
    const token = await Spotify.getAccessToken();
    const response = await fetch(
      `
https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    console.log(json);
    if (!json.tracks) {
      return [];
    } else {
      const tracks = json.tracks.items.map((item) => {
        ({
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri,
        });
      });
      return tracks;
    }
  },
  async savePlaylist(playlistTitle, trackURIs) {
    if (!playlistTitle || !trackURIs) {
      return;
    }
    const token = await Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    //get current user's id
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
      method: "GET",
    });
    const json = await response.json();
    console.log(json);
    const userID = json.id;

    //post playlist's title to current user's account
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/${userID}/playlists`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: playlistTitle }),
      }
    );
    //post track uri's to playlist newly entitled on current user's account
    const jsonPlaylistResponse = await playlistResponse.json();
    console.log(jsonPlaylistResponse);
    const playlistID = jsonPlaylistResponse.id;
    const tracksResponse = await fetch(
      `https://api.spotify.com/v1/${userID}/playlists/${playlistID}/tracks`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ uris: trackURIs }),
      }
    );
    const jsonTracksResponse = await tracksResponse.json();
    console.log(jsonTracksResponse);
    return jsonTracksResponse;
  },
};

export default Spotify;
