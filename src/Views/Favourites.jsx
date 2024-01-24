
import "/src/Sass/RepoList.scss"

import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar.jsx';

const Favourites = () => {
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

    return (
        <>
            <Sidebar />
            <div className="main-today-tasks">
                <div className="main-today-tasks-table">
                    <ul>
                        {favorites.map((repo) => (
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
                                    <strong>Favorites</strong>|
                                    <button onClick={() => handleDelete(repo.id)}>DELETE</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Favourites;




