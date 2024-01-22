import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "/src/Sass/SearchBar.scss"

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <div className="searchBar">
            <h1 className="searchBar-title">GitSearch</h1>
            <img className="searchBar-img" src="/src/assets/GitSearch.svg"/>
            <form className="searchBar-form" onSubmit={handleSubmit}>
                <label className="searchBar-label" htmlFor="searchBar">Search:</label>
                <input className="searchBar-input"
                    type="search"
                    id="searchBar"
                    name="search"
                    placeholder="Wprowadź wyszukiwaną frazę"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="searchBar-button" type="submit">Search</button>
            </form>
        </div>
    );
};
SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default SearchBar;
