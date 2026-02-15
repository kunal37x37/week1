import React, { useState } from 'react';
import './BlogPost.css';

const BlogPost = ({ post, onLike, onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (!liked) {
      setLikesCount(prev => prev + 1);
      setLiked(true);
      onLike && onLike(post.id);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className="blog-post">
      {post.image && (
        <div className="post-image-container">
          <img src={post.image} alt={post.title} className="post-image" />
          <span className="post-category">{post.category}</span>
        </div>
      )}

      <div className="post-content">
        <div className="post-meta">
          <div className="author-info">
            <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
            <div className="author-details">
              <span className="author-name">{post.author.name}</span>
              <span className="post-date">{formatDate(post.date)}</span>
            </div>
          </div>
          <span className="read-time">{post.readTime} min read</span>
        </div>

        <h2 className="post-title">{post.title}</h2>
        
        <p className="post-excerpt">
          {isExpanded ? post.content : post.excerpt}
        </p>

        <button 
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>

        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>

        <div className="post-stats">
          <button 
            className={`stat-button like-button ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <span className="stat-icon">❤️</span>
            <span className="stat-count">{likesCount}</span>
          </button>

          <div className="stat-button">
            <span className="stat-icon">💬</span>
            <span className="stat-count">{post.comments}</span>
          </div>

          <button 
            className="stat-button share-button"
            onClick={() => onShare && onShare(post)}
          >
            <span className="stat-icon">📤</span>
            <span className="stat-count">Share</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;