import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface PersonProps {
  name: string;
  traits: string;
  role: string;
  expertise: string;
  company: string;
}

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
      <h3>{name}</h3>
      <h5>{[role, company].join(', ')}</h5>
    </div>
  );
};

const PersonPopup: React.FC<{ person: PersonProps | null; onClose: () => void }> = ({ person, onClose }) => {
  const navigate = useNavigate();

  if (!person) return null;

  const handleStartButtonClick = () => {
    navigate('/chat');
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div style={{ backgroundColor: 'black', margin: '50px', padding: '20px' }}>
        <h3>{person.name}</h3>
        <p>Traits: {person.traits}</p>
        <p>Role: {person.role}</p>
        <p>Expertise: {person.expertise}</p>
        <p>Company: {person.company}</p>
        <button onClick={handleStartButtonClick}>Start</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [persons] = useState<Array<PersonProps>>([
    {
      name: 'Phil Troutman',
      traits: 'Full Stack Development',
      role: 'Senior Developer',
      expertise: 'React, Redux, and Jest',
      company: 'CodeSmith',
    },
  ]);
  const [selectedPerson, setSelectedPerson] = useState<PersonProps | null>(null);

  const handlePersonClick = (person: PersonProps) => {
    setSelectedPerson(person);
  };

  const closePopup = () => {
    setSelectedPerson(null);
  };

  const handleLogout = async () => {
    try {
      // Send a request to the server to log out the user
      // await axios.post('/logout');
      
      // Navigate back to the sign-in page
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div>
      <div id="instructions-panel">
        <h2>Instructions</h2>
        <p>Click on a personality to start an interview</p>
      </div>
      <div id="recent-history">
        <h2>Recent History</h2>
      </div>
      <div id="persons">
        <h2>Personalities</h2>
        {persons.map((person, index) => (
          <Person
            key={index}
            {...person}
            onClick={() => handlePersonClick(person)}
          />
        ))}
      </div>
      <PersonPopup person={selectedPerson} onClose={closePopup} />
      </div>
    </div>
  );
};

export default HomePage;
