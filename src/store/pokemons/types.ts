import {
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_SUCCESS,
    FETCH_POKEMONS_FAILURE,
    FETCH_POKEMON_DETAIL_REQUEST,
    FETCH_POKEMON_DETAIL_FAILURE,
    FETCH_POKEMON_DETAIL_SUCCESS,
} from "./actionTypes";

export type NamedAPIResource = {
    name: string;
    url: string;
};

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: {
        isHidden: boolean;
        slot: number;
        ability: NamedAPIResource;
    }[];
    image: string;
    alternativeImage: string;
    stats: {
        baseStat: number;
        effort: number;
        stat: NamedAPIResource;
    }[];
    types: {
        slot: number;
        type: NamedAPIResource;
    }[];
};

export interface PokemonsState {
    pending: boolean;
    pokemons: Pokemon[];
    count: number
    error: string | null;
    pendingSelectedPokemon: boolean;
    selectedPokemon: Pokemon | null;
    errorSelectedPokemon: string | null;
}

export interface FetchPokemonsRequest {
    type: typeof FETCH_POKEMONS_REQUEST;
};

export interface FetchPokemonsSuccessPayload {
    pokemons: Pokemon[];
    count: number;
}

export interface FetchPokemonsFailurePayload {
    error: string;
}

export type FetchPokemonsSuccess = {
    type: typeof FETCH_POKEMONS_SUCCESS;
    payload: FetchPokemonsSuccessPayload;
};

export type FetchPokemonsFailure = {
    type: typeof FETCH_POKEMONS_FAILURE;
    payload: FetchPokemonsFailurePayload;
};

export interface FetchPokemonDetailRequest {
    type: typeof FETCH_POKEMON_DETAIL_REQUEST;
};

export interface FetchPokemonDetailSuccessPayload {
    selectedPokemon: Pokemon | null;
}

export interface FetchPokemonDetailFailurePayload {
    errorSelectedPokemon: string;
}

export type FetchPokemonDetailSuccess = {
    type: typeof FETCH_POKEMON_DETAIL_SUCCESS;
    payload: FetchPokemonDetailSuccessPayload;
};

export type FetchPokemonDetailFailure = {
    type: typeof FETCH_POKEMON_DETAIL_FAILURE;
    payload: FetchPokemonDetailFailurePayload;
};

export type DispatchPokemonsType = (args?: PokemonsActions) => void;

export type PokemonsActions =
    | FetchPokemonsSuccess
    | FetchPokemonsRequest
    | FetchPokemonsFailure
    | FetchPokemonDetailSuccess
    | FetchPokemonDetailRequest
    | FetchPokemonDetailFailure