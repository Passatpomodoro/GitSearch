import React, { useState } from 'react';
import axios from 'axios';
import "/src/Sass/Search.scss"
import Sidebar from "../Components/Sidebar.jsx";

function Favorites () {
    return (
        <>
            <Sidebar />
            <div className="main-today-tasks">
                <div className="main-today-tasks-table">
                    <ul>

                    </ul>
                </div>
            </div>
        </>
    );
}

export default Favorites;



