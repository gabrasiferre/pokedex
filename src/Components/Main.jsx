import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import Searchbar from "./Searchbar";
import Compare from "./Compare";

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const [notFound, setNotFound] = useState(false);
    const [isComparing, setIsComparing] = useState(false);
    const initialUrl = "https://pokeapi.co/api/v2/pokemon/";

    const pokeFun = async () => {
        setLoading(true);
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    };

    const searchPokemon = async (pokemon) => {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Pokémon não encontrado");
            }
            return await response.json();
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const getPokemon = async (res) => {
        const promises = res.map(async (item) => {
            const result = await axios.get(item.url);
            return result.data;
        });
        const results = await Promise.all(promises);
        setPokeData((state) => {
            state = [...state, ...results];
            state.sort((a, b) => (a.id > b.id ? 1 : -1));
            return state;
        });
    };

    useEffect(() => {
        pokeFun();
    }, [url]);

    const onSearchHandler = async (pokemon) => {
        if (!pokemon) {
            return;
        }
        setLoading(true);
        setNotFound(false);
        const result = await searchPokemon(pokemon);
        if (!result) {
            setNotFound(true);
            setLoading(false);
            return;
        } else {
            setPokeData([result]);
        }
        setLoading(false);
    };

    const onHomeHandler = () => {
        setUrl(initialUrl);
        setPokeData([]);
        setNotFound(false);
        setIsComparing(false);
    };

    return (
        <>
            <nav>
                <div className="navBar">
                    <img
                        alt="pokeapi-logo"
                        src={"https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"}
                        className="navbar-img"
                    />
                    {!isComparing && <Searchbar onSearch={onSearchHandler} />}
                    <button onClick={onHomeHandler}>Home</button>
                    {!isComparing && <button onClick={() => setIsComparing(true)}>Comparar</button>}
                </div>
            </nav>
            <div className="container">
                {!isComparing ? (
                    <div className="container">
                        <div className="left-content">
                            <Card
                                pokemon={pokeData}
                                loading={loading}
                                infoPokemon={(poke) => setPokeDex(poke)}
                            />
                            <div className="btn-group">
                                {prevUrl && (
                                    <button onClick={() => { setPokeData([]); setUrl(prevUrl); }} > Antes </button>
                                )}
                                {nextUrl && (
                                    <button onClick={() => { setPokeData([]); setUrl(nextUrl); }} > Próximo </button>
                                )}
                            </div>
                        </div>
                        <div className="right-content">
                            <Pokeinfo data={pokeDex} />
                            {notFound && <p>Pokémon não encontrado</p>}
                        </div>
                    </div>
                ) : (
                    <Compare />
                )}
            </div>
        </>
    );
};

export default Main;
