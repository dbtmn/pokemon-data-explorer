import { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../store/rootReducer";
import { fetchPokemons } from "../../store/pokemons/actions";
import { fetchFilters, setActiveFilter } from "../../store/filters/actions";
import { setSearchWord } from "../../store/search/actions";
import mainLogo from '../../../public/pokemon-banner.png';
import Loading from "../../components/Loading";
import Error, { ErrorSize } from "../../shared/Error";
import Table from "../../components/Table";
import { PokemonsState } from "../../store/pokemons/types";
import Filters from "../../components/Filters";
import { FiltersState } from "../../store/filters/types";
import { SearchState } from "../../store/search/types";
import SearchBox from "../../components/SearchBox";


import "./index.scss";
import { isEmpty } from "lodash";
interface DispatchProps {
    fetchPokemons: () => Promise<void>;
    fetchFilters: () => Promise<void>;
    setActiveFilter: (newFilter: string) => void;
    setSearchWord: (activePage: string) => void;
}

interface StateProps {
    pokemonsState: PokemonsState;
    filtersState: FiltersState;
    searchState: SearchState;
}

type DashboardProps = DispatchProps & StateProps;

const Dashboard: FunctionComponent<DashboardProps> = (props) => {
    const navigate = useNavigate();
    const {
        fetchPokemons, pokemonsState,
        fetchFilters, setActiveFilter, filtersState,
        setSearchWord, searchState
    } = props;
    const { error: pokemonsError, pending: pokemonsPending, pokemons } = pokemonsState;
    const { filters, activeFilter } = filtersState;
    const { searchWord } = searchState;
    const [page, setPage] = useState(0)

    const isError = !pokemonsPending && pokemonsError;

    useEffect(() => {
        fetchFilters()
        fetchPokemons()
    }, [fetchFilters, fetchPokemons])

    const navigateDetail = (id: number) => {
        setSearchWord('')
        navigate({
            pathname: '/poke-detail',
            search: `?id=${id}`,
        });
    }

    return <>
        <div className="dashboard__banner_wrapper">
            <img className="dashboard__banner" src={mainLogo} alt="pokemonBanner" />
        </div>
        <SearchBox
            className="dashboard__searchbox"
            onChange={(value) => setSearchWord(value)} />
        {pokemonsPending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message={pokemonsError} />}
        {!isEmpty(pokemons) && !isEmpty(filters) && <div className="dashboard__data">
            <Filters filters={filters} onFilterChange={(newFilter) => {
                setActiveFilter(newFilter)
            }} />
            <Table onClick={navigateDetail} page={page} data={pokemons} activeFilter={activeFilter} searchWord={searchWord} onPageChange={(e, page) => {
                setPage(page)
            }} />
        </div>}
    </>;
}

const mapStateToProps = (state: AppState) => {
    return {
        pokemonsState: state.pokemons,
        filtersState: state.filters,
        searchState: state.search,
    }
}

const mapDispatchToProps = {
    fetchPokemons,
    fetchFilters,
    setActiveFilter,
    setSearchWord
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);