import { AxiosError, isAxiosError } from "axios";
import { getPokemonById, getPokemons } from "../../api";
import { FetchPokemonsRequest, FetchPokemonsSuccessPayload, FetchPokemonsSuccess, FetchPokemonsFailure, FetchPokemonsFailurePayload, DispatchPokemonsType, Pokemon, FetchPokemonDetailSuccessPayload, FetchPokemonDetailFailurePayload, FetchPokemonDetailRequest, FetchPokemonDetailSuccess, FetchPokemonDetailFailure } from "./types";
import { FETCH_POKEMONS_REQUEST, FETCH_POKEMONS_SUCCESS, FETCH_POKEMONS_FAILURE, FETCH_POKEMON_DETAIL_REQUEST, FETCH_POKEMON_DETAIL_FAILURE, FETCH_POKEMON_DETAIL_SUCCESS } from "./actionTypes";

const transformPokemon = (data: any): Pokemon => {

    const transformedAbilities: Pokemon['abilities'] = (data.abilities as any[]).map((ability) => ({
        ability: ability.ability,
        isHidden: ability.is_hidden,
        slot: ability.slot,
    }))

    const transformedStats: Pokemon['stats'] = (data.stats as any[]).map((stat) => ({
        baseStat: stat.base_stat,
        effort: stat.effort,
        stat: stat.stat
    }))

    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        abilities: transformedAbilities,
        image: data.sprites.other["official-artwork"]["front_default"],
        alternativeImage: data.sprites.front_default,
        stats: transformedStats,
        types: data.types
    }
}

export const fetchPokemons = () => async (dispatch: DispatchPokemonsType) => {
    try {
        dispatch(fetchPokemonsRequest());
        const pokeArray: Pokemon[] = [];
        let url: string | undefined = undefined

        do {
            const result: any = (await getPokemons(url))
            const pokemons = result.results

            await Promise.all(
                pokemons.map(async (poke: any) => {
                    const { url } = poke;
                    const pokemonId = Number(url.split("/").slice(-2)[0]);

                    const pokemonResults = await getPokemonById(pokemonId);
                    const pokemonInfo = transformPokemon(pokemonResults)
                    pokeArray.push(pokemonInfo as Pokemon);
                })
            );

            url = result.next
        } while (url !== null)

        dispatch(fetchPokemonsSuccess({ pokemons: pokeArray, count: pokeArray.length }));
    } catch (err) {
        if (isAxiosError(err) && err.response?.status === 404) {
            dispatch(fetchPokemonsFailure({ error: 'Pokémon not found' }));
        } else {
            dispatch(fetchPokemonsFailure({ error: (err as AxiosError).message }));
        }
        return Promise.reject(err);
    }
};

export const fetchPokemonById = (id: number) => async (dispatch: DispatchPokemonsType) => {
    try {
        dispatch(fetchPokemonDetailRequest());
        return getPokemonById(id).then((result) => {
            const selectedPokemonResult = transformPokemon(result as Pokemon)
            dispatch(fetchPokemonDetailSuccess({ selectedPokemon: selectedPokemonResult }));
        }).catch((err) => {
            if (isAxiosError(err) && err.response?.status === 404) {
                dispatch(fetchPokemonDetailFailure({ errorSelectedPokemon: 'Pokémon not found' }));
            } else {
                dispatch(fetchPokemonDetailFailure({ errorSelectedPokemon: (err as AxiosError).message }));
            }
        });
    } catch (err) {
        dispatch(fetchPokemonDetailFailure({ errorSelectedPokemon: (err as AxiosError).message }));
        return Promise.reject(err);
    }
}

export const fetchPokemonsRequest = (): FetchPokemonsRequest => ({
    type: FETCH_POKEMONS_REQUEST,
});

export const fetchPokemonsSuccess = (
    payload: FetchPokemonsSuccessPayload
): FetchPokemonsSuccess => ({
    type: FETCH_POKEMONS_SUCCESS,
    payload,
});

export const fetchPokemonsFailure = (
    payload: FetchPokemonsFailurePayload
): FetchPokemonsFailure => ({
    type: FETCH_POKEMONS_FAILURE,
    payload,
});

export const fetchPokemonDetailRequest = (): FetchPokemonDetailRequest => ({
    type: FETCH_POKEMON_DETAIL_REQUEST,
});

export const fetchPokemonDetailSuccess = (
    payload: FetchPokemonDetailSuccessPayload
): FetchPokemonDetailSuccess => ({
    type: FETCH_POKEMON_DETAIL_SUCCESS,
    payload,
});

export const fetchPokemonDetailFailure = (
    payload: FetchPokemonDetailFailurePayload
): FetchPokemonDetailFailure => ({
    type: FETCH_POKEMON_DETAIL_FAILURE,
    payload,
});
