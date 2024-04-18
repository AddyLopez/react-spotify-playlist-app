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
    const searchURL = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    const searchResponse = await fetch(searchURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(searchResponse);
    const jsonSearchResponse = await searchResponse.json();
    if (!jsonSearchResponse.tracks) {
      console.log("No tracks found");
      return [];
    } else {
      return jsonSearchResponse.tracks.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri,
        };
      });
      //console.log(tracks);
      //return tracks;
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
    const currentUserURL = "https://api.spotify.com/v1/me";
    let userID;
    //get current user's id
    const currentUserResponse = await fetch(currentUserURL, {
      headers: headers,
      method: "GET",
    });
    console.log(currentUserResponse);
    const jsonCurrentUserResponse = await currentUserResponse.json();
    userID = jsonCurrentUserResponse.id;
    //post playlist's title to current user's account
    const playlistsURL = `https://api.spotify.com/v1/${userID}/playlists`;
    const playlistsResponse = await fetch(playlistsURL, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({ name: playlistTitle }),
    });
    console.log(playlistsResponse);
    const jsonPlaylistsResponse = await playlistsResponse.json();
    //post track uri's to playlist newly entitled on current user's account
    const playlistID = jsonPlaylistsResponse.id;
    const postPlaylistTracksURL = `https://api.spotify.com/v1/${userID}/playlists/${playlistID}/tracks`;
    return await fetch(postPlaylistTracksURL, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({ uris: trackURIs }),
    });
  },
  async troubleShoot(searchTerm) {
    const token = await Spotify.getAccessToken();
    const searchURL = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
    const searchResponse = await fetch(searchURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(searchResponse);
    /*const jsonSearchResponse = await searchResponse.json();
    if (!jsonSearchResponse.tracks) {
      console.log("No tracks found");
      return [];
    } else {
      return jsonSearchResponse.tracks.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri,
        };
      });*/
    //console.log(tracks);
    //return tracks;
  },
};

export default Spotify;
