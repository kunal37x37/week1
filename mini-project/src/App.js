import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BlogPost from './components/BlogPost';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import LoadingSpinner from './components/LoadingSpinner';
import postsData from './data/posts.json';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('latest');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate API fetch
        const fetchPosts = async() => {
            try {
                setLoading(true);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setPosts(postsData.posts);
                setFilteredPosts(postsData.posts);
                setLoading(false);
            } catch (err) {
                setError('Failed to load posts. Please try again.');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        filterAndSortPosts();
    }, [searchTerm, selectedCategory, sortBy, posts]);

    const filterAndSortPosts = () => {
        let filtered = [...posts];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }

        // Sort posts
        switch (sortBy) {
            case 'latest':
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'mostLiked':
                filtered.sort((a, b) => b.likes - a.likes);
                break;
            case 'mostCommented':
                filtered.sort((a, b) => b.comments - a.comments);
                break;
            case 'titleAsc':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'titleDesc':
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        setFilteredPosts(filtered);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSortChange = (sortValue) => {
        setSortBy(sortValue);
    };

    const handleLike = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId ?
                {...post, likes: post.likes + 1 } :
                post
            )
        );
    };

    const handleShare = (post) => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(`${post.title} - ${window.location.href}`);
            alert('Link copied to clipboard!');
        }
    };

    if (error) {
        return ( <
            div className = "error-container" >
            <
            h2 > Oops!Something went wrong < /h2> <
            p > { error } < /p> <
            button onClick = {
                () => window.location.reload() } > Try Again < /button> <
            /div>
        );
    }

    return ( <
        div className = "app" >
        <
        Header title = "React Blog" / >

        <
        main className = "main-content" >
        <
        div className = "search-section" >
        <
        SearchBar onSearch = { handleSearch }
        /> <
        /div>

        <
        div className = "blog-layout" >
        <
        aside className = "sidebar" >
        <
        CategoryFilter categories = { posts }
        selectedCategory = { selectedCategory }
        onCategoryChange = { handleCategoryChange }
        onSortChange = { handleSortChange }
        sortBy = { sortBy }
        />

        <
        div className = "sidebar-stats" >
        <
        h3 > Statistics < /h3> <
        div className = "stats-grid" >
        <
        div className = "stat-card" >
        <
        span className = "stat-number" > { posts.length } < /span> <
        span className = "stat-label" > Total Posts < /span> <
        /div> <
        div className = "stat-card" >
        <
        span className = "stat-number" > { new Set(posts.map(p => p.category)).size } <
        /span> <
        span className = "stat-label" > Categories < /span> <
        /div> <
        div className = "stat-card" >
        <
        span className = "stat-number" > { posts.reduce((acc, p) => acc + p.likes, 0) } <
        /span> <
        span className = "stat-label" > Total Likes < /span> <
        /div> <
        div className = "stat-card" >
        <
        span className = "stat-number" > { posts.reduce((acc, p) => acc + p.comments, 0) } <
        /span> <
        span className = "stat-label" > Comments < /span> <
        /div> <
        /div> <
        /div> <
        /aside>

        <
        section className = "posts-section" > {
            loading ? ( <
                LoadingSpinner / >
            ) : filteredPosts.length > 0 ? ( <
                >
                <
                div className = "results-info" >
                <
                h2 > { filteredPosts.length } { filteredPosts.length === 1 ? 'Post' : 'Posts' }
                Found <
                /h2> {
                    searchTerm && ( <
                        p > Search results
                        for: "{searchTerm}" < /p>
                    )
                } <
                /div>

                <
                div className = "posts-grid" > {
                    filteredPosts.map(post => ( <
                        BlogPost key = { post.id }
                        post = { post }
                        onLike = { handleLike }
                        onShare = { handleShare }
                        />
                    ))
                } <
                /div> <
                />
            ) : ( <
                div className = "no-results" >
                <
                h2 > No posts found < /h2> <
                p > Try adjusting your search or filter criteria < /p> <
                button className = "clear-filters-btn"
                onClick = {
                    () => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                        setSortBy('latest');
                    }
                } >
                Clear all filters <
                /button> <
                /div>
            )
        } <
        /section> <
        /div> <
        /main>

        <
        footer className = "blog-footer" >
        <
        p > & copy; 2024 React Blog.All rights reserved. < /p> <
        /footer> <
        /div>
    );
}

export default App;