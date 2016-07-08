import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';

export default class Home extends Component {
  render() {
    console.log('i am the home');
    return (
      <div>
        I am the home.
        {this.props.children}
      </div>
    );
  }
}
