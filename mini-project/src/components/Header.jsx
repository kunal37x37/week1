import React from 'react';
import './Header.css';

const Header = ({ title, onSearch }) => {
  return (
    <header className="blog-header">
      <div className="header-content">
        <div className="logo-container">
          <h1 className="blog-title">{title}</h1>
          <p className="blog-subtitle">Discover amazing stories and insights</p>
        </div>
        
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-value">6</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">3</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">1.2k</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;