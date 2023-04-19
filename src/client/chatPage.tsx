import React, { useState, useContext } from 'react';
import Person from './person';
import './chatPage.scss';
import { useNavigate } from 'react-router-dom';
import { PersonContext, PersonProps } from '../PersonContext';
import Navbar from './navbar';
import PersonPopup from './personPopup';

interface ChatMessage {
  sender: string;
  message: string;
}

interface ConversationProps {
  conversationData: ChatMessage[];
}

const Conversation: React.FC<ConversationProps> = (props) => {
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
  const chatContent: JSX.Element[] = [];
  if (props.conversationData.length) {
    for (let msg of props.conversationData) {
      chatContent.push(<div className={msg.sender}>{msg.message}</div>);
    }
  }
  return <div className="conversation">{chatContent}</div>;
};

const NewChat: React.FC<ConversationProps> = (props) => {
  const handleSendMessageClick = async () => {
    const data = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props.conversationData),
    });

    const response = await data.json();
    setConversationData([
      ...props.conversationData,
      { sender: 'assistant', message: response.message },
    ]);
  };

  return (
    <div className="new-chat-container">
      <div className="new-chat">
        <textarea />
        <button id="send-msg-button" onClick={handleSendMessageClick}>
          →
        </button>
      </div>
      <button id="end-interview-btn">End Interview</button>
    </div>
  );
};

const ChatContainer: React.FC<ConversationProps> = (props) => {
  console.log('chat container', props.conversationData);
  return (
    <div className="chat-container">
      <Conversation conversationData={props.conversationData} />
      <NewChat conversationData={props.conversationData} />
    </div>
  );
};

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [conversationData, setConversationData] = useState<ChatMessage[]>([
    { sender: 'user', message: 'test' },
  ]);
  const personContext = useContext(PersonContext);

  const handleChangePersonClick = () => {
    if (personContext) {
      personContext.setPerson(null);
    }
    navigate('/');
  };

  const handleStartInterviewClick = async () => {
    console.log(conversationData);
    const data = await fetch('/api/initialMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ person: personContext }),
    });

    const response = await data.json();
    setConversationData([
      ...conversationData,
      { sender: 'assistant', message: response.message },
    ]);
  };

  return (
    <>
      <Navbar />
      <div className="chat-page-container">
        <div className="personality-container">
          <div className="selected-personality">
            <h1>Interviewing with:</h1>
            <PersonPopup
              person={personContext?.person ?? null}
              onClose={() => {}}
            />
          </div>
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
        <ChatContainer conversationData={conversationData} />
      </div>
    </>
  );
};

export default ChatPage;
