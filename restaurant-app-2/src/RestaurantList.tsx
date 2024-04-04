import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantList({ restaurants }) {
    console.log(restaurants.restaurants);

    const restaurantsList = restaurants.restaurants || [];
    return (
        <div>
            <h2>Restaurants</h2>
            <ul>
                {restaurantsList.map((restaurant) => (
                    console.log(restaurant),
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