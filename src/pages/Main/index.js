import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { SubmitButton, Form, List } from './styles';

import Container from '../../components/Container';
import api from '../../services/api';

export default function Main() {
  const [newRep, setNewRep] = useState('');
  const [repositorys, setRepositorys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const repos = localStorage.getItem('repos');
    setRepositorys(JSON.parse(repos));
  }, []);

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorys));
  }, [repositorys]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const response = await api.get(`/repos/${newRep}`);

    const data = {
      name: response.data.full_name,
    };

    setRepositorys([...repositorys, data]);

    setLoading(false);
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRep}
          onChange={tex => setNewRep(tex.target.value)}
        />
        <SubmitButton load={loading}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositorys.map(rep => (
          <li key={rep.name}>
            {rep.name}
            <Link to={`/repository/${encodeURIComponent(rep.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
