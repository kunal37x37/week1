import React, { useState } from 'react';
import './Button.css';

const Button = ({ 
  children,
  variant = 'primary', // primary, secondary, success, danger, outline
  size = 'medium', // small, medium, large
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left'
}) => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (e) => {
    if (!disabled && !loading) {
      setClickCount(prev => prev + 1);
      onClick && onClick(e, clickCount + 1);
    }
  };

  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full-width' : '',
    loading ? 'btn-loading' : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {loading && <span className="spinner"></span>}
      
      {icon && iconPosition === 'left' && (
        <span className="btn-icon btn-icon-left">{icon}</span>
      )}
      
      <span className="btn-text">{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="btn-icon btn-icon-right">{icon}</span>
      )}
      
      {!disabled && !loading && (
        <span className="btn-click-count">
          {clickCount > 0 && ` (${clickCount})`}
        </span>
      )}
    </button>
  );
};

export default Button;