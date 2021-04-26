import React from 'react';
import { Alert } from '@patternfly/react-core';

export default class Error extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Alert variant="danger" title="Uh oh, spaghetti-o! We lost that one" />
      </React.Fragment>
    );
  }
}