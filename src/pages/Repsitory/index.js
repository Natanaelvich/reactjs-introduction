import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IsssueList } from './styles';

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

    // get repo and issues
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
              <Link to="/">Voltar as repositorios</Link>
              <img src={owner.avatar_url} alt={owner.login} />
              <h1>{owner.login}</h1>
              <h1>{repos.name}</h1>
              <p>{repos.description}</p>
            </Owner>

            <IsssueList>
              {issuesData.map(issue => (
                <li key={String(issue.id)}>
                  <img
                    src={issue.user.avatar_url}
                    alt={issue.user.login}
                  />
                  <div>
                    <strong>
                      <a href={issue.html_url}>{issue.title}</a>
                      {issue.labels.map(label => (
                        <span key={String(label.id)}>
                          {label.name}
                        </span>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))}
            </IsssueList>
          </Container>
        )}
      </div>
    );
  }
}
