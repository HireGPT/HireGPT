import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PersonProps {
  name: string;
  traits: string;
  role: string;
  expertise: string;
  company: string;
}

// Replace this with the actual person's information
const person: PersonProps = {
  name: 'Phil Troutman',
  traits: 'Full Stack Development',
  role: 'Senior Developer',
  expertise: 'React, Redux, and Jest',
  company: 'CodeSmith',
};

const ChatPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    // Send the user's input to the ChatGPT API and update the messages state
    // with the received responses.

    // Clear the input field
    setInputValue('');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleGoBack}>Back to Home</button>
      <div>
        <h3>{person.name}</h3>
        <p>Role: {person.role}</p>
        <p>Company: {person.company}</p>
        <p>Expertise: {person.expertise}</p>
      </div>
      <div style={{ border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Submit</button>
      </div>
    </div>
  );
};

export default ChatPage;
