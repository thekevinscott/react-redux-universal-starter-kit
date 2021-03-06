import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: () => {
    const promises = [];

    return Promise.all(promises);
  },
}])

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        App
        {this.props.children}
      </div>
    );
  }
}
