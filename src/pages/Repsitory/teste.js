import React, { Component } from 'react';

// import { Container } from './styles';

export default class Repsitory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      repos: {},
      issues: [],
    };
  }

  render() {
    return <div />;
  }
}
