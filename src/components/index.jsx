import { useState, useEffect } from "react";
import { SearchPokemon } from "./search-panel/search-panel-component";
import { PokemonList } from "./list/list-component";
import { PreviousNextList } from "./previous-next-list/previous-next-component";
import { useMount } from "utils";

export const PokemonIndex = () => {
    const [pokemon, setPokemon] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const [offset, setOffset] = useState(0);

    const loadPokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
            .then(response => response.json())
            .then(json => {
                // if (json.next === null) {
                //     setNextUrl(json.next);
                // }
                // if (json.previous === null) {
                //     setPreviousUrl(json.previous);
                // }

                // Add an id to each pokemon for the image url
                json.results.forEach(pokemon => {
                    const id = pokemon.url.split('/')[6];
                    pokemon.id = id;
                })
                // json.results.map((result, index) => result.id = index + 1)
                setPokemon(json.results)
                setFilteredPokemons(json.results)
            });
        setOffset(offset + 10);
    }

    useEffect(() => {
        loadPokemon();
    }, []);

    const loadMorePokemon = () => {
        console.log(offset);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
            .then(response => response.json())
            .then(anotherNewPokemons => {
                const emptyArray = [];
                console.log(anotherNewPokemons.results);
                anotherNewPokemons.results.forEach(pokemon => {
                    emptyArray.push(pokemon);
                    const id = pokemon.url.split('/')[6];
                    pokemon.id = id;
                })
                setPokemon(pokemon => [...pokemon, ...emptyArray]);
                setFilteredPokemons(pokemon => [...pokemon, ...emptyArray]);

            });
        setOffset(offset => offset + 10);
    }

    const onChangeHandler = (event) => {
        // Filter the pokemon list based on the search input
        // Use the original pokemon list to filter
        const comparedPokemons = pokemon.filter((pokemon) => {
            return pokemon.name.includes(event.target.value);
        })
        setFilteredPokemons(comparedPokemons);
    }

    return (
        <div>
            <SearchPokemon onChangeHandler={onChangeHandler} />
            <PokemonList PokemonLists={filteredPokemons} loadMorePokemon={loadMorePokemon} />
            <PreviousNextList nextUrl={nextUrl} previousUrl={previousUrl} onClickPreNexHandler={useMount} />
        </div>
    );
};