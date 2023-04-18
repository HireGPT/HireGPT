import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './client/mainPage';
<<<<<<< HEAD
import ChatPage from './client/chatPage';
import './index.scss';
=======
// import ChatPage from './client/chatPage';
import Login from './client/login';
import Signup from './client/signup';
import App from './App'
import './index.css'

>>>>>>> 43eb0d8586c56079719b73ee09eb6dfb779201ed

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
        <Route path="/chat" element={<ChatPage />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<App />} />
        {/* <Route path="/chat" element={<ChatPage />} /> */}

>>>>>>> 43eb0d8586c56079719b73ee09eb6dfb779201ed
      </Routes>
    </Router>
  </React.StrictMode>
);
