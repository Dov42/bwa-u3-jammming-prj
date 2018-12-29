import React from 'react';
import './playlist.css';
import TrackList from '../tracklist/tracklist.js';

class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSavePlaylist =this.handleSavePlaylist.bind(this);
  }

  handleTitleChange(e){
    this.props.playlistNameChange(e.target.value);
  }
  handleTermChange(e){
    this.setState({searchTerm: e.target.value});
  }
  handleSavePlaylist(){
    this.props.onSave();
  }
  render(){
        return (
          <div className="Playlist">
            <input defaultValue="New Playlist" onChange = {this.handleTitleChange}/>
            <TrackList tracks={this.props.playlistTracks} source="playList" onRemove={this.props.onRemove}/>
            <a className="Playlist-save" onClick = {this.handleSavePlaylist}>SAVE TO SPOTIFY</a>
          </div>
        );
      }
};

export default Playlist;
