import { Fragment, FunctionComponent } from "react";

import './index.scss'
import { Pokemon } from "../../../store/pokemons/types";

interface PokeInformationProps {
    title: string
    picture: string
    height: number
    weight: number
    abilities: Pokemon['abilities']
    stats: Pokemon['stats']
}

const PokeInformation: FunctionComponent<PokeInformationProps> =
    ({ title, picture, height, weight, abilities, stats }) => {

        const filteredAbilities = abilities.filter(ability => !ability.isHidden)

        return <div className="poke-information">
            <img className="poke-information__image" src={picture} />
            <div className="poke-information__info">
                <h1 className="poke-information__title">
                    {title}
                </h1>
                <div className="poke-information__table">
                    <span className="poke-information__label">Height</span>
                    <span className="poke-information__value">{height}</span>
                    <span className="poke-information__label">Weight</span>
                    <span className="poke-information__value">{weight}</span>
                    <span className="poke-information__label">Abilities</span>
                    <span className="poke-information__value">{filteredAbilities.map((ability) => ability.ability.name)}</span>
                </div>
                <h2 className="poke-information__subtitle">
                    Stats
                </h2>
                <div className="poke-information__table">
                    {stats.map((stat, index) =>
                        <Fragment key={index}>
                            <span className="poke-information__label">{stat.stat.name}</span>
                            <span className="poke-information__value">{stat.baseStat}</span>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    }

export default PokeInformation