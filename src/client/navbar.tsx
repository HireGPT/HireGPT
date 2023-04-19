import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../navbar.scss';
import logo from '../assets/chatbot-logo.jpg';
import axios from 'axios';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      // Send a request to the server to log out the user
      await axios.post('/api/logout');

      // Navigate back to the sign-in page
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" />
      </div>
      <button className="navbar-logout" onClick={handleLogout}>
        Log Out
      </button>
    </header>
  );
};

export default Navbar;
