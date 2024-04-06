const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = "http://localhost:3000/";

let accessToken;
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      // If user's access token is already set, simply return the access token.
      return accessToken;
    }

    const tokenIsMatch = window.location.href.match(/accesstoken=([^&]*)/);
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
};

export default Spotify;
