import React from 'react';
import './tracklist.css';
import Track from '../track/track.js';
//<Track key={this.props.tracks[0].id} fullTrack={this.props.tracks[0]}/>

class TrackList extends React.Component{
  constructor(props){
    super(props);
  };

  render(){
      return(
         <div className="TrackList">
           {this.props.tracks.map(track =>{
               return(
                 <Track key={track.id} track={track} source={this.props.source} onAdd={this.props.onAdd} onRemove={this.props.onRemove} chosenTrackId={this.props.chosenTrackId}/>
               )
            })
          }
        </div>
      );
  }
}
export default TrackList;
