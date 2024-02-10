import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // Import the CSS file

const MainPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="main-page-container">
      <img src="https://static.tvmaze.com/images/tvm-header-logo.png" alt="Logo" className="logo" /> {/* Adjust the path to your logo */}
      <div className="main-page-content">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie name..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
    </div>
  );
};

export default MainPage;