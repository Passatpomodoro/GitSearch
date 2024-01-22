import React, { useState } from 'react';
import axios from 'axios';
import "/src/Sass/Search.scss"

import Sidebar from '../Components/Sidebar.jsx';
import SearchBar from '../Components/SearchBar.jsx';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [repositories, setRepositories] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&per_page=10`);
            setRepositories(response.data.items);
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    return (
        <>
            <Sidebar />
            <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
            />
            <div className="main-today-tasks">
                <div className="main-today-tasks-table">
                    <ul>
                        {repositories.map((repo) => (
                            <li key={repo.id} className={`list-styling`}>
                                <div>{repo.name}</div>
                                <button>Ulubione</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
