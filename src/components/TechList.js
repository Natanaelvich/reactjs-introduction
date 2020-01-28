import React, { useState, useEffect } from 'react';

import Tech from './Tech';

export default function TechList() {
  const [techs, setTechs] = useState([]);
  const [tech, setTech] = useState('');

  useEffect(() => {
    const techsLocalStorage = localStorage.getItem('techs');

    if (techs) {
      setTechs(JSON.parse(techsLocalStorage));
    }
  }, []);

  useEffect(() => {
    if (techs.length > 0) {
      localStorage.setItem('techs', JSON.stringify(techs));
    }
  }, [techs]);

  function deleteTech(techDelete) {
    setTechs([...techs.filter(t => t !== techDelete)]);
  }

  return (
    <>
      <ul>
        {techs &&
          techs.map(_tech => (
            <Tech
              key={_tech}
              tech={_tech}
              onDelete={() => deleteTech(_tech)}
            />
          ))}
      </ul>

      <input
        type="text"
        value={tech}
        onChange={text => setTech(text.target.value)}
      />

      <button
        type="button"
        onClick={() => setTechs([...techs, tech])}
      >
        ADD NEW TECH
      </button>
    </>
  );
}
