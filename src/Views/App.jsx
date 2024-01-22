
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Search from "./Search.jsx";
import Favorites from "./Favorites.jsx";

function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Search/>}/>
                <Route path="favorites" element={<Favorites/>}/>
            </Routes>
        </Router>
    )
}

export default App;