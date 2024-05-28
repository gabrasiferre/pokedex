import React, { useState } from 'react';

const Searchbar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchValue);
    };

    return (
        <div className="searchbar">
            <input 
                className='input'
                type="text" 
                placeholder="Buscar Pokémon..." 
                value={searchValue} 
                onChange={handleInputChange} 
            />
            <button onClick={handleSearchClick}>Buscar</button>
        </div>
    );
};

export default Searchbar;
