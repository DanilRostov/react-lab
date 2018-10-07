import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Layout from './components/Layout';
import AuthContainer from './containers/AuthContainer';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AuthContainer />
      </Provider>
    );
  }
};

export default App;