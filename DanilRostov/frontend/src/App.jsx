import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Layout from './components/Layout';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Layout title="Chat App" />
    );
  }
};

export default App;