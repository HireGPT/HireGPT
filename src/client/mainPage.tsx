import React, { useState } from 'react';

interface PersonProps {
  name: string;
}

const Person: React.FC<PersonProps> = ({ name }) => {
  return (
    <div>
      <h3>{name}</h3>
    </div>
  )
}

const HomePage: React.FC = () => {
  const [persons] = useState<Array<PersonProps>>([
    { name: 'Phil Troutman'}
  ]);

  return(
    <div>
      <div id='instructions-panel'>
        <h2>Instructions</h2>
        <p>Click on a personality to start an interview</p>
      </div>
      <div id='recent-history'>
        <h2>Recent History</h2>
        
      </div>
      <div id='persons'>
        <h2>Personalities</h2>
        {persons.map((person, index) => (
          <Person key={index} name={person.name} />
        ))}
      </div>
    </div>
  )
}

export default HomePage;