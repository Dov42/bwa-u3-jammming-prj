import React from 'react'
import './App.css';
import Playlist from './components/playlist/playlist.js';
import SearchBar from './components/searchBar/searchBar.js';
import Results from './components/results/results.js';
import PlayTrack from './components/playtrack/playtrack.js';
import Spotify from './util/spotify.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      searchResults : [],
      playlistTracks : [],
      playlistName : "New Playlist",
      update:"search by artist, album or track name and click the search button",
      chosenTrackId: "63tlZzersJQ4qqMuFtsnXl"
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addToPlaylist =this.addToPlaylist.bind(this);
    this.removeFromPlaylist =this.removeFromPlaylist.bind(this);
    this.updateUser =this.updateUser.bind(this);
    this.playlistNameChange = this.playlistNameChange.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.updateChosenTrack =this.updateChosenTrack.bind(this);
  };

  updateUser(text){
    this.setState({update:text})
  }
  addToPlaylist(track){
    let array = this.state.playlistTracks
      if (track.inPlaylist === false){
          track.inPlaylist = true
          array.push(track);
          this.setState({playlistTracks : array})
          this.setState({update:"Track was added to your playlist, you can play it by clicking 'play' above"})
          console.log(this.state.chosenTrackId)
      }else{
        this.setState({update:'This song is already in your playlist'})
      }
  }
  removeFromPlaylist(track){
    let array = this.state.playlistTracks
      if (track.inPlaylist === true){ //if its in the playlist
          track.inPlaylist = false
          //duplicate the array without the track for removal
          var newArray = array.map(arrayTrack=>{if (track.id !== arrayTrack.id){return arrayTrack}});
          //remove the 'undefined' field that was assigned instead of the track for removal (this is how map works)
          newArray=newArray.filter(track => track !== undefined)
          //update the playlist
          this.setState({playlistTracks : newArray})
          this.setState({update:'Song was removed from your playlist'})
      }
  }
  playlistNameChange(name){
    console.log('name returned is',name)
    this.setState({playlistName: name},function(){console.log('new name is',this.state.playlistName)});
    this.updateUser("Playlist name was updated")
  }
  updateChosenTrack(trackId){
    this.setState({chosenTrackId:trackId},function(){console.log('id for track now is:',this.state.chosenTrackId)});
  }
  savePlaylist(){
    if (this.state.playlistTracks.length>0) {
        if (this.state.playlistName){
          const array = this.state.playlistTracks
          let playlistUri = array.map(arrayTrack=>{return arrayTrack.uri});
          Spotify.getUserDetails(this.state.playlistName,playlistUri).then(userDetails =>{
                Spotify.createSpotifyPlaylist(userDetails.id,this.state.playlistName,playlistUri)//create playlist using userId:
          })
          this.setState({update:`Successfully saved your playlist " ${this.state.playlistName} "`})
        }else{
          this.setState({update:"Can't save a playlist with no name, add a name to your playlist first"})
        }
    }else{
      this.setState({update:"Can't save an empty playlist, add a track to your playlist first"})
    }
  }
  searchSpotify(searchTerm){
    if (searchTerm){
    Spotify.search(searchTerm).then(searchResults => {this.setState({searchResults : searchResults})}) //assigns the results data to a state
    console.log('searchrstults in app',this.state.searchResults)
    }
  }

  render(){
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                      <SearchBar searchSpotify = {this.searchSpotify} update={this.updateUser}/>
                      <PlayTrack trackId={this.state.chosenTrackId}/>
                      <h5 id="User-updates" className="User-updates">{this.state.update}</h5>
                <div className="App-playlist">
                      <Results searchResults = {this.state.searchResults} onAdd={this.addToPlaylist} chosenTrackId={this.updateChosenTrack}/>
                      <Playlist playlistNameChange={this.playlistNameChange} playlistTracks={this.state.playlistTracks} onRemove={this.removeFromPlaylist} onSave={this.savePlaylist}/>
                </div>

          </div>
        </div>
      );
    }
}
export default App;
