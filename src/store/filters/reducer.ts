import { FETCH_FILTERS_REQUEST, FETCH_FILTERS_SUCCESS, FETCH_FILTERS_FAILURE, SET_ACTIVE_FILTER } from "./actionTypes";
import { FiltersActions, FiltersState } from "./types";

const initialState: FiltersState = {
    pending: false,
    filters: [],
    activeFilter: '',
    error: null,
};

const filtersReducer = (state = initialState, action: FiltersActions) => {
    switch (action.type) {
        case FETCH_FILTERS_REQUEST:
            return {
                ...state,
                pending: true,
                filters: [],
                count: 0
            };
        case FETCH_FILTERS_SUCCESS:
            return {
                ...state,
                pending: false,
                filters: action.payload.filters || [],
                error: null,
            };
        case FETCH_FILTERS_FAILURE:
            return {
                ...state,
                pending: false,
                filters: [],
                error: action.payload.error,
            };
        case SET_ACTIVE_FILTER:
            return {
                ...state,
                activeFilter: action.activeFilter
            };
        default:
            return {
                ...state,
            };
    }
};

export default filtersReducer;