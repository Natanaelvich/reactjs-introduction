import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner } from './styles';

export default class Repsitory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      repos: {},
      owner: {},
      issuesData: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repo);

    this.setState({ loading: true });

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repos: repository.data,
      issuesData: issues.data,
      owner: repository.data.owner,
      loading: false,
    });
  }

  render() {
    const { loading, issuesData, repos, owner } = this.state;

    return (
      <div>
        {loading ? (
          <Loading>Carregando</Loading>
        ) : (
          <Container>
            <Owner>
              <img src={owner.avatar_url} alt={owner.login} />
              <h1>{owner.login}</h1>
              <h1>{repos.name}</h1>
              <p>{repos.description}</p>
            </Owner>
          </Container>
        )}
      </div>
    );
  }
}
