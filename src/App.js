import React from 'react';
import './App.css';

class Search extends React.Component {
  render () {
    return (
      <div className="App">
        <header className="Bite">
          <h1>Bite Search</h1>
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

class Results extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Results</h1>
      </div>
    )
  }
}

export { Search, Results };
