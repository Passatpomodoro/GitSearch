import { Link } from 'react-router-dom';
import "/src/Sass/Sidebar.scss"

export default function Sidebar () {
    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/">Search</Link>
                    </li>
                    <li>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}