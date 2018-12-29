import React from 'react';
import './results.css';
import TrackList from '../tracklist/tracklist.js';

class Results extends React.Component{

  render(){
    return (
        <div className="SearchResults">
            <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} source="results" onAdd={this.props.onAdd} chosenTrackId={this.props.chosenTrackId}/>
        </div>
    );
  }
};

export default Results;
