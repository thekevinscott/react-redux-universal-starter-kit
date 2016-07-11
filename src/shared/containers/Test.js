import React, { Component } from 'react';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: () => {
    console.log('async connect promise');
    const promises = [function foo() {
      return new Promise((resolve) => {
        console.log('Test promise resolved');
        resolve('good');
      });
    }];

    return Promise.all(promises);
  },
}])

export default class Test extends Component {
  render() {
    return (
      <div>
        This is Test.
        <Link to="/">Go to home</Link>
      </div>
    );
  }
}

