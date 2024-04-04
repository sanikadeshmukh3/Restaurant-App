import React, { useState, useEffect } from 'react';

function RestaurantDetails({ match, response }) {
    const { params: { id } } = match;
    // Fetch restaurant details based on the id
    const restaurantName = response[id]; // Assuming response contains restaurant names
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            const restaurantData = await fetch('/api/restaurants/${match.params.id');
            const restaurant = await restaurantData.json();
            setRestaurant(restaurant);
        };

        fetchRestaurant();
    }, [match.params.id]);

    return (
        <div>
            {restaurant ? (
                <div>
                    <h1>{restaurant.name}</h1>
                    <p>Location: {restaurant.location}</p>
                    <p>Type of Food: {restaurant.type}</p>
                </div>
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
}

export default RestaurantDetails;