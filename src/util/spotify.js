import GetToken from './get_token.js';
// spotify contains 4 methods:
// Spotify Search: gets term seraches spotify and returns  albums tracks and artists that matches the term
// getUserDetails - gets user details (later own id is extracted for creating a new playlist)
// addTrackToPlaylist - adds tracks to existing playlist by URIs, playlist name and user // IDEA:
// createSpotifyPlaylist - creates a new plyalist, requires playlist name and user id.

//get token -relevant for all methods
var token =GetToken.getAccessToken();
const corsUrl = 'https://cors-anywhere.herokuapp.com/'


// module Spotify to be exported:
const Spotify  = {
  search(searchTerm) {
    const searchUrl = 'https://api.spotify.com/v1/search?q='
    const typeUrl = '&type=track%2Cartist%2Calbum'
    const urlToFetch = corsUrl + searchUrl + searchTerm + typeUrl

    // Use the token to search the API and bring back all matches
    return fetch(urlToFetch,{
      mehod:'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-type': 'application/json'
      }
    }).then(response => {
              if(response.ok){
              const jsonResponse = response.json();
              //console.log('API Response json format:',jsonResponse)
              return jsonResponse
            }}).then(jsonResponse => {
               if(jsonResponse){
               const array = [];
               jsonResponse.tracks.items.map(track => { //duplicates from body all the relevant track data to a new array.
               let trackDetails = {
                  id : track.id,
                  name : track.name,
                  popularity : track.popularity,
                  href : track.href,
                  album :track.album,
                  ablumName : track.album.name,
                  duration_ms: track.duration_ms,
                  artist: track.artists.name,
                  artistId: track.artists.id,
                  uri: track.uri,
                  inPlaylist :false
                }
                array.push(trackDetails);
            })
            return array
          }
        })
 },//search function

 getUserDetails(playlistName,playlistUri) {
    const corsUrl = 'https://cors-anywhere.herokuapp.com/'
    const searchUrl = 'https://api.spotify.com/v1/me' //get user details
    const urlToFetch = corsUrl + searchUrl

    // Use the token to sretrive user details
    return fetch(urlToFetch,{headers: {'Authorization': 'Bearer ' + token},
    json: true}).then(response => {
              if(response.ok){
              const jsonResponse = response.json();
              //console.log('user Id response json format:',jsonResponse)
              return jsonResponse
            }
        })
}, //end of method getUserDetails

addTrackToPlaylist(playlistId,playlistUri) {
    const corsUrl = 'https://cors-anywhere.herokuapp.com/'
    const searchUrl = 'https://api.spotify.com/v1/playlists/'
    const searchUrl2 = '/tracks?'
    const uriString = '&uris=' + playlistUri.join(",")
    const urlToFetch = corsUrl + searchUrl + playlistId + searchUrl2 + uriString

    // Use the token, plyalist Id and URI to add tracks to existing playlist
    return fetch(urlToFetch,{
            method:'POST',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-type': 'application/json'
            },
          }).then(response => {
                    if(response.ok){
                    const jsonResponse = response.json();
                    //console.log('playlist Cration RsponseIs:',jsonResponse)
                    return jsonResponse.id
                  }
                })

    }, //end of method addTrackToPlyalist

createSpotifyPlaylist(userId,playlistName,playlistUri) {
  const corsUrl = 'https://cors-anywhere.herokuapp.com/'
  const searchUrl = 'https://api.spotify.com/v1/users/' //get user ID
  const searchUrl2 = '/playlists' //get user ID
  const urlToFetch = corsUrl + searchUrl + userId + searchUrl2

  //creates new spotify playlist based on userId and playlist name. (URIs forwraded to addTrackToPlaylist to add them to the new playlist)
  const data ={
    "name": playlistName,
    "description": "",
    "public": true
  }
  console.log(data);

  return fetch(urlToFetch,{
    method:'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
            if(response.ok){
                const jsonResponse = response.json();
                //console.log('playlist Cration RsponseIs:',jsonResponse)
                return jsonResponse
                }
          }).then(jsonResponse=> {
            if(jsonResponse){
               Spotify.addTrackToPlaylist(jsonResponse.id,playlistUri) //adds the tracks to the newly created playlist
            }
        })
  } //end of method createSpotifyPlaylist
}//end of Spotify Module

export default Spotify
