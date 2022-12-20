import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import Pokecard from '../components/Pokedex/Pokecard'
import './styles/pokedex.css'

const Pokedex = () => {

    const { trainer } = useSelector(state => state)
    const [pokemons, setPokemons] = useState()
    const [types, setTypes] = useState()
    const [typeSelect, setTypeSelect] = useState('All pokemons')

    const navigate = useNavigate()


    useEffect(() => {
        if (typeSelect !== "All pokemons") {
            axios.get(typeSelect)
                .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
                .catch(err => console.log(err))
        } else {
            const URL = ('https://pokeapi.co/api/v2/pokemon?offset=0&limit=9999999999999')
            axios.get(URL)
                .then(res => setPokemons(res.data.results))
                .catch(err => console.log(err))
        }
    }, [typeSelect])

    useEffect(() => {
        const URL = 'https://pokeapi.co/api/v2/type'
        axios.get(URL)
            .then(res => setTypes(res.data.results))
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = e => {
        e.preventDefault()
        const input = (e.target.search.value.trim().toLowerCase());
        navigate(`/pokedex/${input}`)
    }
    const handleChange = e => {
        setTypeSelect(e.target.value)
        setPage(1)
    }

    const [page, setPage] = useState(1)
    const [pokePerPage, setPokePerPage] = useState(8)
    const initialPoke = (page - 1) * pokePerPage
    const finalPoke = page * pokePerPage
    const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)

    return (
        <div>
            <h2 className='pokedex__title'>Welcome {trainer}, here you can find your favorite pokemon.</h2>
            <>
            <div className='pokedex__request'>
            <form className='pokedex__form' onSubmit={handleSubmit}>
                <input className='pokedex__input' id='search' type="text" placeholder='Name Pokemon' />
                <button className='pokedex_button'>Search</button>
            </form>
            <select className='pokedex__select' onChange={handleChange}>
                <option value={'All pokemons'}>All pokemons</option>
                {
                    types?.map(type => (
                        <option key={type.url} value={type.url}>{type.name}</option>
                    ))
                }
                <option></option>
            </select>
            </div>
            </>
            <div className='pagination__container'>
            <Pagination
                page={page}
                maxPage={maxPage}
                setPage={setPage}
            />
            </div>
            <div className='poke_container'>
                {
                    pokemons?.slice(initialPoke, finalPoke).map(poke => (
                        <Pokecard
                            key={poke.url}
                            url={poke.url}
                        />
                    ))
                }

            </div>
            <div className='pagination__container'>
            <Pagination
                page={page}
                maxPage={maxPage}
                setPage={setPage}
            />
            </div>

        </div>
    )
}

export default Pokedex