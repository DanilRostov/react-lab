import React, { Component } from 'react';
import ReactDom from 'react-dom';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <div className="app">
          <div className="app__container">
            <h2 className="app__title"></h2>
            <p className="app__text"></p>
          </div>
        </div>
      </div>
    );
  }
};

export default App;