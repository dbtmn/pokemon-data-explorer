import { SET_SEARCH_WORD } from "./actionTypes";
import { SearchActions, SearchState } from "./types";

const initialState: SearchState = {
    searchWord: ''
};

const filtersReducer = (state = initialState, action: SearchActions) => {
    switch (action.type) {
        case SET_SEARCH_WORD:
            return {
                ...state,
                searchWord: action.searchWord
            };
        default:
            return {
                ...state,
            };
    }
};

export default filtersReducer;