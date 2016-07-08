import React, { Component } from 'react';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: () => {
    const promises = [];

    return Promise.all(promises);
  }
}])

export default class App extends Component {

  render() {
    return (
      <div>
        I am the App !!!!1
      </div>
    );
  }
}
