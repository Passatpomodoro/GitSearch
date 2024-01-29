import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import "/src/Sass/SortBar.scss";
import PropTypes from 'prop-types';

const SortBar = ({ onSort, onFetchMoreRepos }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isMoreReposVisible, setMoreReposVisible] = useState(false);

    const handleIconClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleSort = (option) => {
        onSort(option);
        setDropdownVisible(false);
    };

    const handleFetchMoreRepos = (event) => {
        event.preventDefault();
        setMoreReposVisible(!isMoreReposVisible);
    };

    return (
        <div className="list-sort">
            <div className="list-sort-buttons">
                <button onClick={handleFetchMoreRepos}>More Repos</button>
                <span onClick={handleIconClick}>
          <FontAwesomeIcon className="list-sort-icon" icon={faArrowUpWideShort} />
        </span>
            </div>
            {isDropdownVisible && (
                <div className="sort-dropdown">
                    <button onClick={() => handleSort('ID ascending')}>ID ascending</button>
                    <button onClick={() => handleSort('ID descending')}>ID descending</button>
                    <button onClick={() => handleSort('Date ascending')}>Date ascending</button>
                    <button onClick={() => handleSort('Date descending')}>Date descending</button>
                </div>
            )}
            {isMoreReposVisible && (
                <div className="sort-dropdown">
                    <button onClick={() => onFetchMoreRepos(5)}>5 Repos</button>
                    <button onClick={() => onFetchMoreRepos(10)}>10 Repos</button>
                    <button onClick={() => onFetchMoreRepos(50)}>50 Repos</button>
                </div>
            )}
        </div>
    );
};


SortBar.propTypes = {
    onSort: PropTypes.func.isRequired,
    onFetchMoreRepos: PropTypes.func.isRequired,
};

export default SortBar;
