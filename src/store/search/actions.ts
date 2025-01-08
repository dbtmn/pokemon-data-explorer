import { SetSearchWord } from "./types";
import { SET_SEARCH_WORD } from "./actionTypes";


export const setSearchWord = (searchWord: string): SetSearchWord => ({
    type: SET_SEARCH_WORD,
    searchWord
});
