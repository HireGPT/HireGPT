import React, { useState, useContext } from 'react';
import Person from './person';
import './chatPage.scss';
import { useNavigate } from 'react-router-dom';
import { PersonContext, PersonProps } from '../PersonContext';
import Navbar from './navbar';
import PersonPopup from './personPopup';

interface ChatMessage {
  role: string;
  message: string;
}

interface ConversationProps {
  conversationData: ChatMessage[];
  updateConversation?: (any) => void;
}

const Conversation: React.FC<ConversationProps> = (props) => {
  const sampleData = [
    {
      role: 'gpt',
      message: `(chat-gpt-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here
      , content here', making it look like readable English. Many desktop publishing packages and web 
      page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' 
      will uncover many web sites still in their infancy. Various versions have evolved over the years, 
      sometimes by accident, sometimes on purpose (injected humour and the like).`,
    },
    {
      role: 'user',
      message: `(user-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here'`,
    },
    {
      role: 'gpt',
      message: `(chat-gpt-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here
      , content here', making it look like readable English. Many desktop publishing packages and web 
      page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'`,
    },
    {
      role: 'user',
      message: `(user-message) It is a long established fact that a reader will be distracted`,
    },
    {
      role: 'gpt',
      message: `(chat-gpt-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here
      , content here', making it look like readable English. Many desktop publishing packages and web 
      page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'`,
    },
    {
      role: 'user',
      message: `(user-message) It is a long established fact that a reader will be distracted 
      by the readable content of a page when looking at its layout. The point of using Lorem Ipsum 
      is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here'`,
    },
  ];

  // const data = await fetch('/api/chat', {message: });
  const chatContent: JSX.Element[] = [];
  if (props.conversationData.length) {
    for (let msg of props.conversationData) {
      chatContent.push(<div className={msg.role}>{msg.message}</div>);
    }
  }
  return <div className="conversation">{chatContent}</div>;
};

const NewChat: React.FC<ConversationProps> = (props) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessageClick = async () => {
    const messages = [
      ...props.conversationData,
      { role: 'user', message: newMessage },
    ];

    console.log('sending:', messages);
    const data = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages }),
    });

    const response = await data.json();
    console.log('response', response);
    if (props.updateConversation) {
      // props.updateConversation([
      //   ...messages,
      //   { role: 'assistant', message: response.message },
      // ]);
      props.updateConversation(response.messages);
    }
  };

  const handleTextAreaChange = (e) => {
    setNewMessage(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="new-chat-container">
      <div className="new-chat">
        <textarea onChange={handleTextAreaChange} />
        <button id="send-msg-button" onClick={handleSendMessageClick}>
          →
        </button>
      </div>
      <button id="end-interview-btn">End Interview</button>
    </div>
  );
};

const ChatContainer: React.FC<ConversationProps> = (props) => {
  return (
    <div className="chat-container">
      <Conversation
        conversationData={props.conversationData}
        updateConversation={props.updateConversation}
      />
      <NewChat
        conversationData={props.conversationData}
        updateConversation={props.updateConversation}
      />
    </div>
  );
};

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [conversationData, setConversationData] = useState<ChatMessage[]>([]);
  const personContext = useContext(PersonContext);

  const handleChangePersonClick = () => {
    if (personContext) {
      personContext.setPerson(null);
    }
    navigate('/');
  };

  const handleStartInterviewClick = async () => {
    let person;
    if (personContext && personContext.person) {
      person = personContext.person;
    }
    const data = await fetch('/api/initialMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ person: person }),
    });

    const response = await data.json();
    setConversationData([
      ...conversationData,
      { role: 'assistant', message: response.message },
    ]);
    // setConversationData(response);
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
        <ChatContainer
          conversationData={conversationData}
          updateConversation={(data) => setConversationData(data)}
        />
      </div>
    </>
  );
};

export default ChatPage;
