import React from 'react';
import './playtrack.css';

class PlayTrack extends React.Component{

  render(){
        return (
          <div className ="PlayTrack-Frame">
            <iframe className="PlayTrack" src={`https://open.spotify.com/embed/track/${this.props.trackId}`} width="300" height="80" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
        );
      }
};

export default PlayTrack;
