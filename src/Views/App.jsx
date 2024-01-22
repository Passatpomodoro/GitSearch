
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Search from "./Search.jsx";
import Favourites from "./Favourites.jsx";

function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Search/>}/>
                <Route path="favourites" element={<Favourites/>}/>
            </Routes>
        </Router>
    )
}

export default App;