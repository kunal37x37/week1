import React, { useState } from 'react';
import './Card.css';

const Card = ({ 
  title, 
  description, 
  imageUrl, 
  price,
  rating,
  onButtonClick,
  buttonText = 'Learn More',
  variant = 'default' // default, product, profile
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className={`card card-${variant} ${isHovered ? 'card-hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div className="card-image-container">
          <img src={imageUrl} alt={title} className="card-image" />
          {variant === 'product' && (
            <button 
              className={`like-button ${isLiked ? 'liked' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              ♥
            </button>
          )}
        </div>
      )}

      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        
        {variant === 'product' && price && (
          <div className="card-price">${price}</div>
        )}

        {variant === 'profile' && rating && (
          <div className="card-rating">
            {'★'.repeat(rating)}
            {'☆'.repeat(5 - rating)}
          </div>
        )}

        <button 
          className="card-button"
          onClick={() => onButtonClick && onButtonClick({ title, price })}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;