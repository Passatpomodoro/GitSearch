import React, { useState, useEffect } from 'react';
import '/src/Sass/RepoList.scss';
import '/src/Sass/SearchBar.scss';
import SortBar from "../Components/SortBar.jsx";
import Sidebar from '../Components/Sidebar.jsx';
import SearchBar from '../Components/SearchBar.jsx';

const RepoList = () => {
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [sortOption, setSortOption] = useState(null);

    const handleSearch = async (query) => {
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${query}`, {
                headers: {
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const data = await response.json();
            setRepos(data.items);

            sessionStorage.setItem('cachedRepos', JSON.stringify(data.items));
        } catch (error) {
            setError(error.message);
            console.error('Error fetching repos:', error);
        }
    };

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
                        Authorization: import.meta.env.VITE_API_KEY,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }

                const data = await response.json();
                setRepos(data);

                sessionStorage.setItem('cachedRepos', JSON.stringify(data));
            } catch (error) {
                setError(error.message);
                console.error('Error fetching repos:', error);
            }
        };

        fetchRepos();
    }, []);

    useEffect(() => {
        const cachedRepos = JSON.parse(sessionStorage.getItem('cachedRepos')) || [];
        setRepos(cachedRepos);
    }, []);

    const handleFetchMoreRepos = async (count) => {
        event.preventDefault()
        try {
            const response = await fetch(`https://api.github.com/repositories?per_page=${count}`, {
                headers: {
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const data = await response.json();
            setRepos(data);

            sessionStorage.setItem('cachedRepos', JSON.stringify(data));
        } catch (error) {
            setError(error.message);
            console.error('Error fetching more repos:', error);
        }
    };


    const handleSort = (option) => {
        setSortOption(option);
    };

    useEffect(() => {
        let sortedRepos = [...repos];

        switch (sortOption) {
            case 'ID ascending':
                sortedRepos = sortedRepos.sort((a, b) => a.id - b.id);
                break;
            case 'ID descending':
                sortedRepos = sortedRepos.sort((a, b) => b.id - a.id);
                break;
            case 'Date ascending':
                sortedRepos = sortedRepos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                break;
            case 'Date descending':
                sortedRepos = sortedRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            default:
                break;
        }
        console.log('Sorted Repos:', sortedRepos);
        setRepos(sortedRepos);
    }, [sortOption]);

    return (
        <>
            <Sidebar />
            <SearchBar onSearch={handleSearch} />
            <SortBar onSort={handleSort} onFetchMoreRepos={handleFetchMoreRepos} />
            <div>
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
