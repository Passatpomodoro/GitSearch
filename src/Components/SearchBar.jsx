// SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <div className="searchBar">
            <h1 className="searchBar-title">GitSearch</h1>
            <img className="searchBar-img" src="/src/assets/GitSearch.svg" alt="GitSearch" />
            <form className="searchBar-form" onSubmit={handleSearch}>
                <label className="searchBar-label" htmlFor="searchBar">
                    Search:
                </label>
                <input
                    className="searchBar-input"
                    type="text"
                    id="searchBar"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your search query"
                />
                <button className="searchBar-button" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
