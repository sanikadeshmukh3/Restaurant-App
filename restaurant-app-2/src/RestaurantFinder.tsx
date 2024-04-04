import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SearchForm from './SearchForm';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import NotFound from './NotFound';
import axios from 'axios';

function RestaurantFinder() {
    
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const apiKey = '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';

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/completions',
                {
                    model: 'text-davinci-002', // Or any other model you prefer
                    prompt: `Find restaurants in ${userInput}`,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );
            setResponse(response.data.choices[0].text.trim().split('\n'));
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
                <Link to={''}>
                    <Route exact path="/">
                        <SearchForm
                            userInput={userInput}
                            handleUserInput={handleUserInput}
                            handleSearch={handleSearch}
                            isLoading={isLoading}
                        />
                        <RestaurantList restaurants={response} />
                    </Route>
                    <Route path="/restaurant/:id" render={(props) => <RestaurantDetails {...props} response={response} />} />
                    <Route path="*" Component={NotFound} />
                </Link>
            </div>
        </Router>
    );
}

export default RestaurantFinder;