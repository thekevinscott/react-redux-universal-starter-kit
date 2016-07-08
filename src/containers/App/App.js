import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';

export default class App extends Component {
  render() {
    return (
      <div>
        I am the App v1!!!!{Math.random()}
      </div>
    );
  }
}
