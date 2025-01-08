import { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import Icon from "../../components/Icon";
import { AppState } from "../../store/rootReducer";
import { PokemonsState } from "../../store/pokemons/types";
import { fetchPokemonById } from "../../store/pokemons/actions";
import Loading from "../../components/Loading";
import Error, { ErrorSize } from "../../shared/Error";
import PokeInformation from "./PokeInformation";

import "./index.scss";
import Header from "../../components/Header";

interface DispatchProps {
    fetchPokemonById: (id: number) => Promise<void>;
}

interface StateProps {
    pokemonsState: PokemonsState;
}

type PokeDetailProps = DispatchProps & StateProps;

const PokeDetail: FunctionComponent<PokeDetailProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id")) || "";

    const { pokemonsState, fetchPokemonById } = props;
    const { pokemons, pendingSelectedPokemon, errorSelectedPokemon, selectedPokemon } = pokemonsState;

    const pokeInfo = pokemons.filter(poke => poke.id === id)
    const [pokeDetail, setPokeDetail] = useState(pokeInfo[0])

    useEffect(() => {
        if (pokeDetail === undefined && id) {
            fetchPokemonById(id).then(() => {
                selectedPokemon && setPokeDetail(selectedPokemon)
            })
        }
    }, [pokeDetail, id, fetchPokemonById, selectedPokemon])

    return <>
        <button className="poke-detail__back" onClick={() => { navigate(-1) }}>
            <Icon iconClassName="poke-detail__back-icon" iconName="arrow_back" />
        </button>
        <Header title="Poke Detail" />

        {pendingSelectedPokemon && <Loading />}
        {errorSelectedPokemon && <Error size={ErrorSize.lg} message={errorSelectedPokemon} />}
        {!isEmpty(pokeDetail) &&
            <div className="poke-detail__section base-shadow">
                <PokeInformation
                    title={pokeDetail.name}
                    picture={pokeDetail.image || pokeDetail.alternativeImage}
                    height={pokeDetail.height}
                    weight={pokeDetail.weight}
                    abilities={pokeDetail.abilities}
                    stats={pokeDetail.stats} />
            </div>
        }
    </>;
}

const mapStateToProps = (state: AppState) => {
    return {
        pokemonsState: state.pokemons,
    }
}

const mapDispatchToProps = {
    fetchPokemonById
};

export default connect(mapStateToProps, mapDispatchToProps)(PokeDetail);