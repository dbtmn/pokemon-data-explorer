import { createApiRequest } from "./ApiRequest";
import { HTTP_METHODS } from "../constants/globals";

export const getPokemons = async (nextUrl?: string) => {
    const url = nextUrl || 'https://pokeapi.co/api/v2/pokemon/';

    return createApiRequest(url, HTTP_METHODS.GET);
}

export const getPokemonById = async (id: number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return createApiRequest(url, HTTP_METHODS.GET);
}

export const getFilters = async () => {
    const url = "https://pokeapi.co/api/v2/type/";

    return createApiRequest(url, HTTP_METHODS.GET);
}
