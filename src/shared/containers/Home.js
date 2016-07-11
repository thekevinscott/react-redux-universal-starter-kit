import React, { Component } from 'react';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: () => {
    const promises = [];

    return Promise.all(promises);
  },
}])

export default class Home extends Component {
  render() {
    return (
      <div>
        This is Home.
        <Link to="/test">Go to test</Link>
      </div>
    );
  }
}
