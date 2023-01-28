import { useState, useEffect, useContext } from "react";
import { SearchPokemon } from "./search-panel";
import { PokemonList } from "./list";
import { CardList } from "./fake-card";
import useFetch from "utils/fetch";


export const PokemonIndex = () => {
    // const UserContext = createContext();

    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [pokemon, setPokemon] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    //if comparedPokemons.length < 0, then hide the load-more button,show no data image
    const [comparedPokemons, setComparedPokemons] = useState([pokemon]);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [totalPokemon, setTotalPokemon] = useState(0);

    const [urls, setUrls] = useState([]);

    const loadPokemon = (limit = 12, offset = 0) => {
        const newPokemon = [];
        // console.log("currentOffset - 1", currentOffset);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(json => {
                setInitLoading(false);
                setLoading(false);
                setTotalPokemon(json.count);
                json.results.forEach(pokemon => {
                    const id = pokemon.url.split('/')[6];
                    pokemon.id = id;
                    newPokemon.push(pokemon);
                })
                setPokemon([...pokemon, ...newPokemon]);
                setFilteredPokemon([...pokemon, ...newPokemon]);
            });
        setCurrentOffset(currentOffset + 12);
    }

    const load = (limit = 12, offset = 0) => {
        const newPokemon = [];
        // console.log("currentOffset - 1", currentOffset);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(json => {
                setInitLoading(false);
                setLoading(false);
                setTotalPokemon(json.count);
                json.results.forEach(data => {
                    const url = data.url;
                    fetch(url)
                        .then(response => response.json())
                        .then(json => {
                            newPokemon.push(json);
                        });
                })
                setPokemon([...pokemon, ...newPokemon]);
                setFilteredPokemon([...pokemon, ...newPokemon]);
            });
        console.log("pokemon", pokemon);
        setCurrentOffset(currentOffset + 12);
    }

    const load2 = async (limit = 12, offset = 0) => {
        const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await api.json();
        const promises = await data.results.map(async pokemon => {
            const result = await fetch(pokemon.url);
            const res = await result.json();
            return res;
        })

        const newPokemon = await Promise.all(promises);

        setPokemon([...pokemon, ...newPokemon]);
        setFilteredPokemon([...pokemon, ...newPokemon]);
        setCurrentOffset(currentOffset + 12);


    }

    // const loadMorePokemon = () => {
    //     loadPokemon(12, currentOffset);
    //     setLoading(true);
    // }
    const loadMorePokemon = () => {
        load4(12, currentOffset);
        setLoading(true);
    }

    const Load3 = (limit = 12, offset = 0) => {
        const urls = [];

        const { status, data } = useFetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        if (status === "fetched") {
            setTotalPokemon(data.count);
            const allUrls = []
            data.results.map(d => {
                allUrls.push(d.url);
            })
            setUrls(...allUrls, ...urls);
        }
    }

    // urls.map(url => {
    //     GetAllPokemon(url);
    // })

    const GetAllPokemon = async (url) => {
        const { status, data } = useFetch(url);
        if (status === "fetched") {
            setPokemon([...pokemon, data]);
            setFilteredPokemon([...pokemon, data]);
        }
    }


    useEffect(() => {
        // loadPokemon();
        load4();
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


    const load4 = async (limit = 12, offset = 0) => {
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



    return (
        <>
            <SearchPokemon onChangeHandler={onChangeHandler} totalPokemon={totalPokemon} />
            <PokemonList PokemonLists={filteredPokemon} loadMorePokemon={loadMorePokemon} comparedPokemons={comparedPokemons} />
        </>
    );
};
