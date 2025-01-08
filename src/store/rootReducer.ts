import { combineReducers } from "redux";
import pokemonsReducer from "./pokemons/reducer";
import filtersReducer from "./filters/reducer";
import searchReducer from "./search/reducer";

const rootReducer = combineReducers({
    pokemons: pokemonsReducer,
    filters: filtersReducer,
    search: searchReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;