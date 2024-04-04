import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantList({ restaurants }) {
    return (
        <div>
            <h2>Restaurants</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        <Link to={`/restaurant/${restaurant.id}`}>
                            <div>
                                <h3>{restaurant.name}</h3>
                                <p>Type: {restaurant.type}</p>
                                <p>Location: {restaurant.location}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RestaurantList;