import React from 'react';
import { ReduxAsyncConnect } from 'redux-async-connect';

export default (props, helpers, filter) => {
  return (
    <ReduxAsyncConnect
      {...props}
      helpers={helpers}
      filter={filter}
    />
  );
};
