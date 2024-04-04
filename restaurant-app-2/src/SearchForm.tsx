import React from 'react';

function SearchForm({ userInput, handleUserInput, handleSearch, isLoading }) {
    return (
        <div>
            <input
                type="text"
                value={userInput}
                onChange={handleUserInput}
                placeholder="Enter location"
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </div>
    );
}

export default SearchForm;