import React, { useState } from 'react';
import Person from './person';
import './chatPage.scss';
import { useNavigate } from 'react-router-dom';
import { PersonContext, PersonProps } from '../PersonContext';
import Navbar from './navbar';

const Conversation: React.FC = () => {
  const sampleData = [
    {
      sender: 'gpt',
      message: `(chat-gpt-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here
      , content here', making it look like readable English. Many desktop publishing packages and web 
      page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' 
      will uncover many web sites still in their infancy. Various versions have evolved over the years, 
      sometimes by accident, sometimes on purpose (injected humour and the like).`,
    },
    {
      sender: 'user',
      message: `(user-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here'`,
    },
    {
      sender: 'gpt',
      message: `(chat-gpt-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here
      , content here', making it look like readable English. Many desktop publishing packages and web 
      page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'`,
    },
    {
      sender: 'user',
      message: `(user-message) It is a long established fact that a reader will be distracted`,
    },
    {
      sender: 'gpt',
      message: `(chat-gpt-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here
      , content here', making it look like readable English. Many desktop publishing packages and web 
      page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'`,
    },
    {
      sender: 'user',
      message: `(user-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here'`,
    },
  ];

  // const data = await fetch('/api/chat', {message: });

  const chatContent = [];
  for (let msg of sampleData) {
    chatContent.push(<div className={msg.sender}>{msg.message}</div>);
  }
  return <div className="conversation">{chatContent}</div>;
};

const NewChat: React.FC = () => {
  return (
    <div className="new-chat-container">
      <div className="new-chat">
        <textarea />
        <button id="send-msg-button">→</button>
      </div>
      <button id="end-interview-btn">End Interview</button>
    </div>
  );
};

const ChatContainer: React.FC = () => {
  return (
    <div className="chat-container">
      <Conversation />
      <NewChat />
    </div>
  );
};

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [conversationData, setConversationData] = useState([]);

  const handleChangePersonClick = () => {
    navigate('/');
  };

  const handleStartInterviewClick = async () => {
    // const data = await fetch ('/api/chat',
    // method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify( )
  };

  return (
    <>
      <Navbar />
      <div className="chat-page-container">
        <div className="personality-container">
          {/* <Person /> */}
          <div>{'person'}</div>
          <div className="personality-buttons">
            <button
              className="button-deemphasize"
              onClick={handleChangePersonClick}
            >
              {'Change Personality'}
            </button>
            <button onClick={handleStartInterviewClick}>
              {'Start Interview'}
            </button>
          </div>
        </div>
        <ChatContainer />
      </div>
    </>
  );
};

// use navigate

export default ChatPage;
