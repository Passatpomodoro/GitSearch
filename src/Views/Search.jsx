import React, { useState, useEffect } from 'react';
import '/src/Sass/Search.scss';
import '/src/Sass/SearchBar.scss';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faSort} from "@fortawesome/free-brands-svg-icons";

import Sidebar from '../Components/Sidebar.jsx';

const RepoList = () => {
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${query}`, {
                headers: {
                    Authorization: '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',
                },
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const data = await response.json();
            setRepos(data.items);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching repos:', error);
        }
    };

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleDelete = (repoId) => {

        const updatedFavorites = favorites.filter((repo) => repo.id !== repoId);

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleAddToFavorites = (repoId) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const isAlreadyFavorite = favorites.some((favorite) => favorite.id === repoId);

        if (!isAlreadyFavorite) {
            const repoToAdd = repos.find((repo) => repo.id === repoId);

            if (repoToAdd) {
                favorites.push(repoToAdd);
                localStorage.setItem('favorites', JSON.stringify(favorites));

                setRepos((prevRepos) =>
                    prevRepos.map((repo) =>
                        repo.id === repoId ? { ...repo, isFavorite: true } : repo
                    )
                );
            }
        }
    };



    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/repositories', {
                    headers: {
                        Authorization: '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',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }

                const data = await response.json();
                setRepos(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching repos:', error);
            }
        };

        fetchRepos();
    }, []);

    return (
        <>
            <Sidebar />
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

            <div>
                <div>
                    {/*<FontAwesomeIcon icon="fa-solid fa-sort" />*/}
                </div>
                <div className="main-today-tasks">
                    <div className="main-today-tasks-table">
                        <ul>
                            {repos.map((repo) => (
                                <li key={repo.id}>
                                    <div className="list-info">
                                        <strong>ID:</strong> {repo.id} |
                                        <strong>Nazwa repozytorium:</strong> {repo.full_name} |
                                        <strong>Właściciel:</strong> {repo.owner.login} |
                                        <strong>Ilość gwiazdek:</strong> {repo.stargazers_count || 'Brak informacji'} |
                                        <strong>Data utworzenia:</strong>{' '}
                                        {repo.created_at ? new Date(repo.created_at).toLocaleDateString() : 'Brak informacji'}
                                    </div>
                                    <div className="list-function">
                                        <strong>Favourites</strong>|
                                        <button
                                            className={repo.isFavorite ? 'favoriteButton favoriteButton--disabled' : 'favoriteButton'}
                                            onClick={() => handleAddToFavorites(repo.id)}
                                            disabled={repo.isFavorite}
                                        >
                                            {repo.isFavorite ? 'ADDED' : 'ADD'}
                                        </button>
                                        <button onClick={() => handleDelete(repo.id)}>DELETE</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RepoList;
