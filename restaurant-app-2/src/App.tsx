import { Routes, Link, Route } from 'react-router-dom';
import RestaurantFinder from './RestaurantFinder'; // Assuming this is your main component

function App() {
    return (
        <Routes>
            <Route path="/" element={<RestaurantFinder />} />
        </Routes>
    );
}

export default App;

