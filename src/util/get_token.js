//Gets token from spotify
var accessToken

const client_id ="client_id=ADD_HERE"
const response_type= "&response_type=token"
const redirect_uri = "&redirect_uri=http://localhost:3000/callback"
const urlQuery= "https://accounts.spotify.com/authorize?"
const scope = "&scope=playlist-modify-public playlist-modify-private user-read-private user-read-email user-library-read"
const state = "&state=asdqwe123"

const urlToFetch= urlQuery + client_id +response_type+ redirect_uri + scope + state

const GetToken = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
      //gets the access token from the url, puts it into an array, it is the second item.
      accessToken = window.location.href.match(/access_token=([^&]*)/)
      //gets expirey time from the url, puts it into an array, it is the second item.
      var expiresIn = window.location.href.match(/expires_in=([^&]*)/)

      //
      if (accessToken && expiresIn) {
        accessToken = accessToken[1] //retrive from the array the token string
        expiresIn = parseInt(expiresIn[1])*1000 //to have it in sec instead of ms

        //trigger expirey time for the token
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        //clean the url from token and expirey and allows getting new token when this one expires
        window.history.pushState('Access Token', null, '/');
        return accessToken;

      } else { // this is used on the first attempt or when the token expires.
        window.location = urlToFetch;
      }
  }
}

export default GetToken
