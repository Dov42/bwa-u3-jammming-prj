//this will be a class to reperesent a single Track
import React from 'react';
import './track.css';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      isRemovable : 'flase',
    }
    this.renderAction = this.renderAction.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  };

  renderAction(){
    if (this.props.source === "results"){
      return "+"
    } else { // if source is playlist
      return "-"
    }
  }

  handleClick(){
    const trackId = this.props.track.id
    if (this.props.source === "results") {
      this.setState({isRemovable :'true'})
      this.props.onAdd(this.props.track)
      this.props.chosenTrackId(trackId)
    }else{
      this.props.onRemove(this.props.track)
    }
  }

  handlePlay(){
    const trackId = this.props.track.id
      this.props.chosenTrackId(trackId)
  }

  render(){
      return(
        <div className="Track">
          <div className="Track-information">
            <h3>{this.props.track.name} </h3>
            <p>{this.props.track.name}  ||  {this.props.track.album.name}</p>
          </div>
          <a className="Track-play" onClick={this.handlePlay}> > </a>
          <a className="Track-action" onClick={this.handleClick}>{this.renderAction()}</a>
        </div>
    );
  }
};

export default Track;
