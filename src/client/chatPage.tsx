import React, { useState } from 'react';
import PersonPopup from './mainPage';

const Conversation: React.FC = () => {
  return <div className="conversation">{'Conversation'}</div>;
};

const NewChat: React.FC = () => {
  return (
    <div className="new-chat">
      {'New chat'}
      <button>Submit</button>
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
      <div className="personality-description">
        {'Current personality placeholder'}
      </div>
      <button>{'Change personality'}</button>
      <button>{'Start chat'}</button>
      <ChatContainer />
    </div>
  );
};

export default ChatPage;
