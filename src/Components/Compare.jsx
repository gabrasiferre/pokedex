import React, { useState } from "react";
import axios from "axios";

const Compare = () => {
    const [pokemon1, setPokemon1] = useState(null);
    const [pokemon2, setPokemon2] = useState(null);
    const [search1, setSearch1] = useState("");
    const [search2, setSearch2] = useState("");

    const handleSearch1 = async () => {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search1.toLowerCase()}`);
        setPokemon1(result.data);
    };

    const handleSearch2 = async () => {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search2.toLowerCase()}`);
        setPokemon2(result.data);
    };

    const getTotalBaseStats = (pokemon) => {
        return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
    };

    return (
        <div className="compare-container">
            <div className="search-section">
                <div>
                    <input
                        className="input"
                        type="text"
                        value={search1}
                        onChange={(e) => setSearch1(e.target.value)}
                        placeholder="Buscar Pokémon 1"
                    />
                    <button className="btn" onClick={handleSearch1}>Buscar</button>
                </div>
                <div>
                    <input
                        className="input"
                        type="text"
                        value={search2}
                        onChange={(e) => setSearch2(e.target.value)}
                        placeholder="Buscar Pokémon 2"
                    />
                    <button className="btn" onClick={handleSearch2}>Buscar</button>
                </div>
            </div>

            <div className="results-section">
                {pokemon1 && (
                    <div className="pokemon-card">
                        <h2>{pokemon1.name}</h2>
                        <img src={pokemon1.sprites.front_default} alt={pokemon1.name} />
                        {pokemon1.stats.map((stat, index) => (
                            <h3 key={index}>{stat.stat.name}: {stat.base_stat}</h3>
                        ))}
                        <h2> Soma dos Atributos: {getTotalBaseStats(pokemon1)}</h2>
                    </div>
                )}
                {pokemon2 && (
                    <div className="pokemon-card">
                        <h2>{pokemon2.name}</h2>
                        <img src={pokemon2.sprites.front_default} alt={pokemon2.name} />
                        {pokemon2.stats.map((stat, index) => (
                            <h3 key={index}>{stat.stat.name}: {stat.base_stat}</h3>
                        ))}
                        <h2> Soma dos atributos: {getTotalBaseStats(pokemon2)}</h2>
                    </div>
                )}
            </div>

            {pokemon1 && pokemon2 && (
                <div className="comparison">
                    <h2>Comparação</h2>
                    <p>Total de atributos base:</p>
                    <p className="p1">{pokemon1.name}: {getTotalBaseStats(pokemon1)}</p>
                    <p className="p1">{pokemon2.name}: {getTotalBaseStats(pokemon2)}</p>

                    {getTotalBaseStats(pokemon1) > getTotalBaseStats(pokemon2)
                        ? <p className="p1">{pokemon1.name} é o pokemon com maior soma de atributos.</p>
                        : <p className="p1">{pokemon2.name} é o pokemon com maior soma de atributos.</p>}

                </div>
            )}
        </div>
    );
};

export default Compare;
