import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  onSortChange,
  sortBy = 'latest'
}) => {
  const categoryCounts = categories.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  const uniqueCategories = ['All', ...Object.keys(categoryCounts)];

  return (
    <div className="filter-container">
      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        <div className="category-list">
          {uniqueCategories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              <span className="category-name">{category}</span>
              {category !== 'All' && (
                <span className="category-count">{categoryCounts[category]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Sort By</h3>
        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="mostLiked">Most Liked</option>
          <option value="mostCommented">Most Commented</option>
          <option value="titleAsc">Title A-Z</option>
          <option value="titleDesc">Title Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;