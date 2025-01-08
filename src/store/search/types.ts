import { SET_SEARCH_WORD } from "./actionTypes";

export interface SearchState {
    searchWord: string
}

export type DispatchSearchType = (args?: SearchActions) => void;

export type SearchActions =
    | SetSearchWord


export interface SetSearchWord {
    type: typeof SET_SEARCH_WORD;
    searchWord: string;
}
