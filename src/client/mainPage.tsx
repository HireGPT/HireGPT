import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonContext, PersonProps } from '../PersonContext';
import PersonPopup from './personPopup';
import Person from './person';
import Navbar from './navbar';
import axios from 'axios';
import './mainPage.scss';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const personContext = useContext(PersonContext);
  const [persons, setPersons] = useState<Array<PersonProps>>([
    {
      name: 'Phil Troutman',
      traits: 'Full Stack Development',
      role: 'Senior Developer',
      expertise: 'React, Redux, and Jest',
      company: 'CodeSmith',
    },
  ]);

  // useEffect(() => {
  //   const fetchPersons = async () => {
  //     try {
  //       const response = await axios.get("/api/persons"); // Replace with the correct API endpoint
  //       setPersons(response.data);
  //     } catch (error) {
  //       console.error("Error fetching persons:", error);
  //     }
  //   };

  //   fetchPersons();
  // }, []);

  const handlePersonClick = (person: PersonProps) => {
    if (personContext) {
      personContext.setPerson(person);
    }
  };

  const closePopup = () => {
    if (personContext) {
      personContext.setPerson(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div>
          <div className="instructions-panel">
            <h1>Instructions</h1>
            <p>Click on a personality to start an interview</p>
          </div>
          <div id="recent-history">
            <h1>Recent History</h1>
          </div>
          <div id="persons">
            <h1>Personalities</h1>
            {persons.map((person, index) => (
              <Person
                key={index}
                {...person}
                onClick={() => handlePersonClick(person)}
              />
            ))}
          </div>
          <PersonPopup
            person={personContext?.person ?? null}
            onClose={closePopup}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
