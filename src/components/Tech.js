import React from 'react';
import PropTypes from 'prop-types';

function Tech({ tech, onDelete }) {
  return (
    <li>
      {tech}
      <button type="button" onClick={onDelete}>
        remove
      </button>
    </li>
  );
}

Tech.propTypes = {
  tech: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Tech;
