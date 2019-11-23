import React from 'react';
import './App.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: ''
    }
  }
  render () {
    return (
      <div className="App">
        <header className="Bite">
          <h1>Search</h1>
          <form>
            <label>
              Zipcode: 
              <input type="text" name="zipcode"></input>
            </label>
            <input type="submit" value="Submit"></input>
          </form>
        </header>
      </div>
    );
  }
}

export default Search;
