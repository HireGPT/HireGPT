import React, { useState } from 'react';
import PersonPopup from './mainPage';
import '../chatPage.scss';

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
      <button id="send-msg-button">→</button>
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
