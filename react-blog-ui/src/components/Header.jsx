import React from 'react';
import './Header.css';

const Header = ({ title, subtitle, logo, navItems, backgroundColor = '#f8f9fa' }) => {
  return (
    <header className="header" style={{ backgroundColor }}>
      <div className="header-container">
        <div className="logo-container">
          {logo && <img src={logo} alt="Logo" className="logo" />}
          <div className="title-container">
            <h1 className="header-title">{title}</h1>
            {subtitle && <p className="header-subtitle">{subtitle}</p>}
          </div>
        </div>
        
        <nav className="nav-menu">
          <ul className="nav-list">
            {navItems && navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a href={item.link} className="nav-link">{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;