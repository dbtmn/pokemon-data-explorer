import { NamedAPIResource } from "../pokemons/types";
import { FETCH_FILTERS_SUCCESS, FETCH_FILTERS_REQUEST, FETCH_FILTERS_FAILURE, SET_ACTIVE_FILTER } from "./actionTypes";

export interface FiltersState {
    pending: boolean;
    filters: Filter[];
    activeFilter: string;
    error: string | null;
}

export type Filter = NamedAPIResource

export interface FetchFiltersSuccessPayload {
    filters: string[]
}

export interface FetchFiltersFailurePayload {
    error: string;
}

export type FetchFiltersSuccess = {
    type: typeof FETCH_FILTERS_SUCCESS;
    payload: FetchFiltersSuccessPayload;
};

export interface FetchFiltersRequest {
    type: typeof FETCH_FILTERS_REQUEST;
};

export type FetchFiltersFailure = {
    type: typeof FETCH_FILTERS_FAILURE;
    payload: FetchFiltersFailurePayload;
};

export type DispatchFiltersType = (args?: FiltersActions) => void;

export type FiltersActions =
    | FetchFiltersSuccess
    | FetchFiltersRequest
    | FetchFiltersFailure
    | SetActiveFilter


export interface SetActiveFilter {
    type: typeof SET_ACTIVE_FILTER;
    activeFilter: string;
}
