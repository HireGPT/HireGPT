import React, { useState } from 'react';
import PersonPopup from './mainPage';

const Conversation: React.FC = () => {
  const sampleData = [
    {
      sender: 'gpt',
      message: 'chat-gpt-message',
    },
    {
      sender: 'user',
      message: 'user-message',
    },
    {
      sender: 'gpt',
      message: 'chat-gpt-message',
    },
    {
      sender: 'user',
      message: 'user-message',
    },
  ];

  const chatContent = [];
  for (let msg of sampleData) {
    chatContent.push(<div className={msg.sender}>{msg.message}</div>);
  }
  return <div className="conversation">{chatContent}</div>;
};

const NewChat: React.FC = () => {
  return (
    <div className="new-chat">
      <textarea />
      <button>Send</button>
    </div>
  );
};

const ChatContainer: React.FC = () => {
  return (
    <div className="chat-container">
      <Conversation />
      <NewChat />
      <button>End Interview</button>
    </div>
  );
};

const ChatPage: React.FC = () => {
  return (
    <div className="chat-page-container">
      <div className="personality-container">
        {'Current personality placeholder'}
        <div className="personality-buttons">
          <button>{'Change personality'}</button>
          <button>{'Start chat'}</button>
        </div>
      </div>
      <ChatContainer />
    </div>
  );
};

// use navigate

export default ChatPage;
