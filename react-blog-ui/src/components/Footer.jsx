import React from 'react';
import './Footer.css';

const Footer = ({ 
  companyName, 
  year = new Date().getFullYear(),
  links,
  socialLinks,
  backgroundColor = '#343a40',
  textColor = '#fff' 
}) => {
  return (
    <footer className="footer" style={{ backgroundColor, color: textColor }}>
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">{companyName}</h3>
          <p className="footer-copyright">
            &copy; {year} {companyName}. All rights reserved.
          </p>
        </div>

        {links && links.length > 0 && (
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="footer-link" style={{ color: textColor }}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {socialLinks && socialLinks.length > 0 && (
          <div className="footer-section">
            <h4 className="footer-subtitle">Follow Us</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  style={{ color: textColor }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;