import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersonProvider } from './PersonProvider';
import HomePage from './client/mainPage';
import ChatPage from './client/chatPage';
import Login from './client/login';
import Signup from './client/signup';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <PersonProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </PersonProvider>
    </Router>
  </React.StrictMode>
);
