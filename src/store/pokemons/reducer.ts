import {
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_SUCCESS,
    FETCH_POKEMONS_FAILURE,
    FETCH_POKEMON_DETAIL_FAILURE,
    FETCH_POKEMON_DETAIL_REQUEST,
    FETCH_POKEMON_DETAIL_SUCCESS,
} from "./actionTypes";

import { PokemonsActions, PokemonsState } from "./types";

const initialState: PokemonsState = {
    pending: false,
    pokemons: [],
    count: 0,
    error: null,
    pendingSelectedPokemon: false,
    selectedPokemon: null,
    errorSelectedPokemon: null
};

const pokemonsReducer = (state = initialState, action: PokemonsActions) => {
    switch (action.type) {

        case FETCH_POKEMONS_REQUEST:
            return {
                ...state,
                pending: true,
                pokemons: [],
                count: 0
            };
        case FETCH_POKEMONS_SUCCESS:
            return {
                ...state,
                pending: false,
                pokemons: action.payload.pokemons || [],
                count: action.payload.count || 0,
                error: null,
            };
        case FETCH_POKEMONS_FAILURE:
            return {
                ...state,
                pending: false,
                pokemons: [],
                count: 0,
                error: action.payload.error,
            };
        case FETCH_POKEMON_DETAIL_REQUEST:
            return {
                ...state,
                pendingSelectedPokemon: true,
                selectedPokemon: null,
            };
        case FETCH_POKEMON_DETAIL_SUCCESS:
            return {
                ...state,
                pendingSelectedPokemon: false,
                selectedPokemon: action.payload.selectedPokemon || null,
            };
        case FETCH_POKEMON_DETAIL_FAILURE:
            return {
                ...state,
                pendingSelectedPokemon: false,
                selectedPokemon: null,
                errorSelectedPokemon: action.payload.errorSelectedPokemon,
            };
        default:
            return {
                ...state,
            };
    }
};

export default pokemonsReducer;