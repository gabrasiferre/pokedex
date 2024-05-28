import React from "react";

const getTotalBaseStats = (pokemon) => {
    return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
};

const Pokeinfo = ({ data }) => {
    return (
        <>
            {
                (!data) ? "" : (
                    <>
                        <h1>{data.name}</h1>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} alt="" />
                        <div className="base-stat">
                            {
                                data.stats.map(poke => {
                                    return (
                                        <>
                                            <h3>{poke.stat.name}: {poke.base_stat}</h3>
                                        </>
                                    )
                                }) 
                            }
                            <h3>Soma dos atributos: {getTotalBaseStats(data)}</h3>
                        </div>
                    </>
                )
            }

        </>
    )
}
export default Pokeinfo