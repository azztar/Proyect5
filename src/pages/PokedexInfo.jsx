import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/pokedexInfo.css'

const PokedexInfo = () => {

  const { id } = useParams()

  const [pokemon, setPokemon] = useState()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(URL)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [id])

  console.log(pokemon)

  return (
    <section className='pokedex__container'>
      <div className="content">
        <header className={`info__header ${pokemon?.types[0].type.name}`}>
          <div className="info">
            <img src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} />
          </div>
        </header>
        <article className='body__container'>
          <div className="body__info-title">
            <span className="info__id">#{pokemon?.id}</span>
            <div className="body__info-name">
              <p className="info__name">
                {pokemon?.name}
              </p>
            </div>
            <div className="body__info-measures">
              <ul className='info__measure-items'>
                <li className='info__measure-item'><span className='measure__item-stat'>Peso</span> {pokemon?.weight}</li>
                <li className='info__measure-item'><span className='measure__item-stat'>Altura</span> {pokemon?.height}</li>
              </ul>
            </div>
          </div>
        </article>
        <section className='types__container'>
          <div className='types__type'>
            <h3 className='type__title'>Type</h3>
            <ul className='type__items'>
              {
                pokemon?.types.map(type => (
                  <li
                    className={`type__item ${type.type.name}`}
                    key={type.type.name}>
                    {type.type.name}
                  </li>
                ))
              }
            </ul>
          </div>
          <div className='skill__container'>
            <h3 className='skill__title'>Skills</h3>
            <ul className='skills__items'>
              {
                pokemon?.abilities.map(skils => (
                  <li
                    className='skill__item'
                    key={skils.ability.name}>
                    {skils.ability.name}
                  </li>
                ))
              }
            </ul>
          </div>
        </section>
        <main className='stats__container'>
          <div className="content__title-img">
            <h3 className='stats__title'>Stats</h3>
            <img className='stats__img' src="/Home/pokebola.png" alt="" />
          </div>
          <div className='stats__body'>
            {
              pokemon?.stats.map(stat => (
                <div
                  className='stats__content'
                  key={stat.stat.name}
                >
                  <div className='stats__description'>
                    <span className='stats__description-span'>
                      {stat.stat.name}:
                    </span>
                    <span className='stats__description-base'>
                      {stat.base_stat}/ 100
                    </span>
                  </div>
                  <div className='stats__progress'>
                    <progress className='progress' max="100" value={stat.base_stat}></progress>
                  </div>
                </div>
              ))
            }
          </div>
        </main>
      </div>
      <div className="content">
        <footer className='footer__container'>
          <div className="footer__title-img">
            <h3 className='footer__title'>Movements</h3>
            <img className='stats__img' src="/Home/pokebola.png" alt="" />
          </div>
          <ul className='footer__list'>
            {
              pokemon?.moves.map(move => (
                <li className='footer__items' key={move.move.name}>
                  {move.move.name}
                </li>
              ))
            }
          </ul>
        </footer>
      </div>
    </section>
  )
}

export default PokedexInfo
