import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import "/src/Sass/SortBar.scss";
import PropTypes from 'prop-types';

const SortBar = ({ onSort }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleIconClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleSort = (option) => {
        onSort(option);
        setDropdownVisible(false);
    };

    return (
        <div className="list-sort">
            <span onClick={handleIconClick}>
                <FontAwesomeIcon className="list-sort-icon" icon={faArrowUpWideShort} />
            </span>
            {isDropdownVisible && (
                <div className="sort-dropdown">
                    <button onClick={() => handleSort('ID ascending')}>ID ascending</button>
                    <button onClick={() => handleSort('ID descending')}>ID descending</button>
                    <button onClick={() => handleSort('Date ascending')}>Date ascending</button>
                    <button onClick={() => handleSort('Date descending')}>Date descending</button>
                </div>
            )}
        </div>
    );
};

SortBar.propTypes = {
    onSort: PropTypes.func.isRequired,
};

export default SortBar;