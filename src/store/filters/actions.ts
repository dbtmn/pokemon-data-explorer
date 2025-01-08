import { AxiosError } from "axios";
import { DispatchFiltersType, FetchFiltersFailure, FetchFiltersFailurePayload, FetchFiltersRequest, FetchFiltersSuccess, FetchFiltersSuccessPayload, SetActiveFilter } from "./types";
import { FETCH_FILTERS_FAILURE, FETCH_FILTERS_REQUEST, FETCH_FILTERS_SUCCESS, SET_ACTIVE_FILTER } from "./actionTypes";
import { getFilters } from "../../api";

export const fetchFilters = () => async (dispatch: DispatchFiltersType) => {
    try {
        dispatch(fetchFiltersRequest());
        return getFilters()
            .then((result) => {
                dispatch(fetchFiltersSuccess({ filters: result.results }));
            })
            .catch((err) => {
                dispatch(fetchFiltersFailure({ error: err.message }));
            });
    } catch (err) {
        dispatch(fetchFiltersFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
};

export const fetchFiltersRequest = (): FetchFiltersRequest => ({
    type: FETCH_FILTERS_REQUEST,
});

export const fetchFiltersSuccess = (
    payload: FetchFiltersSuccessPayload
): FetchFiltersSuccess => ({
    type: FETCH_FILTERS_SUCCESS,
    payload,
});

export const fetchFiltersFailure = (
    payload: FetchFiltersFailurePayload
): FetchFiltersFailure => ({
    type: FETCH_FILTERS_FAILURE,
    payload,
});

export const setActiveFilter = (activeFilter: string): SetActiveFilter => ({
    type: SET_ACTIVE_FILTER,
    activeFilter
});
