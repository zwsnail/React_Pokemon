import { useState, useEffect, useContext } from "react";
import { SearchPokemon } from "./search-panel";
import { PokemonList } from "./list";

export const PokemonIndex = () => {

    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    //if comparedPokemons.length < 0, then hide the load-more button,show no data image
    const [comparedPokemons, setComparedPokemons] = useState([pokemon]);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [totalPokemon, setTotalPokemon] = useState(0);

    const loadPokemon = async (limit = 12, offset = 0) => {
        const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await api.json();

        setTotalPokemon(data.count);

        const url = data.results.map(result => result.url);

        const promises = url.map(async url => {
            const response = await fetch(url);
            return await response.json();
        })

        const additionalData = await Promise.all(promises);
        setPokemon([...pokemon, ...additionalData]);
        setFilteredPokemon([...pokemon, ...additionalData]);
        setCurrentOffset(currentOffset + 12);
    }

    const loadMorePokemon = () => {
        loadPokemon(12, currentOffset);
        setLoading(true);
    }

    useEffect(() => {
        loadPokemon();
    }, []);


    const onChangeHandler = (event) => {
        // Filter the pokemon list based on the search input
        // Use the original pokemon list to filter
        const comparedPokemons = pokemon.filter((pokemon) => {
            return pokemon.name.includes(event.target.value.toLowerCase());
        })
        setComparedPokemons(comparedPokemons);
        setTimeout(() => {
            setFilteredPokemon(comparedPokemons);
        }, 500);
    }

    return (
        <>
            <SearchPokemon onChangeHandler={onChangeHandler} totalPokemon={totalPokemon} />
            <PokemonList PokemonLists={filteredPokemon} loadMorePokemon={loadMorePokemon} comparedPokemons={comparedPokemons} />
        </>
    );
};
