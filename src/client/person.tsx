import React from 'react';
import { PersonProps } from '../PersonContext';

const Person: React.FC<PersonProps & { onClick: () => void }> = ({
  name,
  traits,
  role,
  expertise,
  company,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <h2>{name}</h2>
      <h3>{[role, company].join(', ')}</h3>
    </div>
  );
};

export default Person;
