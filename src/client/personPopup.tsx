// PersonPopup.tsx
import React from 'react';
import { PersonProps } from '../PersonContext';
import { useNavigate } from 'react-router-dom';
import './personPopup.scss';
import axios from 'axios';

interface PersonPopupProps {
  person: PersonProps | null;
  onClose: () => void;
}

const PersonPopup: React.FC<PersonPopupProps> = ({ person, onClose }) => {
  const navigate = useNavigate();

  if (!person) return null;

  const handleStartButtonClick = async () => {
    try {
      console.log(person);
      await axios.post('/api/initialMessage', { person }); // Make the API call
      navigate('/chat'); // Navigate to /chat after the API call is completed
    } catch (error) {
      console.error('Error submitting person:', error);
    }
  };

  return (
    <div className="person-popup-container">
      <div className="person-popup-content">
        <h3>{person.name}</h3>
        <p>Traits: {person.traits}</p>
        <p>Role: {person.role}</p>
        <p>Expertise: {person.expertise}</p>
        <p>Company: {person.company}</p>
        <div className="popup-buttons">
          <button onClick={handleStartButtonClick}>Start</button>
          <button className="button-deemphasize" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonPopup;
