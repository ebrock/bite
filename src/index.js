import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Search from './search';
import Results from './results';
// import { ReactComponent } from '*.svg';

class App extends React.Component {
  render () {
    return (
      <div>
        <Search />
        <Results />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));