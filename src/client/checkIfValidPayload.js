/*
 * A sanity check to see if the server has returned
 * a valid payload.
 *
 * If not, alert the developer so long as we're
 * not in production.
 */
import React from 'react';

export default (dest) => {
  if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger

    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
      console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
  }
};
