import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';

export default class App extends Component {
  render() {
    console.log('i am the app');
    return (
      <div>
        I am the app.
        {this.props.children}
      </div>
    );
  }
}
