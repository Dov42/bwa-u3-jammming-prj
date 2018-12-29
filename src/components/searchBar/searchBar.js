import React from 'react';
import './searchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm: "",
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleTermChange(e){
    this.setState({searchTerm: e.target.value});
    this.props.update("search by artist, album or track name and click the search button")
  }
  handleSearch(e){
    this.props.searchSpotify(this.state.searchTerm)
    this.props.update("Add songs to your playlist by clicking the plus sign")
  }
  handleKeyPress(e){
    if(e.key === 'Enter'){
      this.handleSearch(this.state.searchTerm)
    }
  }

  render(){
      return(
        <div className="SearchBar">
              <input id="Playlist-Title" onChange = {this.handleTermChange} placeholder="Enter A Song Title" update={this.props.updateUser} onKeyPress = {this.handleKeyPress}/>
              <a onClick = {this.handleSearch} >SEARCH</a>
        </div>
    );
  }
};

export default SearchBar;
