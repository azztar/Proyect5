import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerGlobal } from '../store/slices/trainer.slice'
import './styles/home.css'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerGlobal(e.target.name.value.trim()))
    e.target.name.value = ""
    navigate('/pokedex')
  }
  return (
    <div className='home'>
      <header className='home__header'>
      <img src="/Home/pokedex.png"  />
      </header>
      <h1 className='home__title'>Hi Trainer!</h1>
      <p className='home__name'>Give me your name to start </p>
      <div className='home__conte'>
        <form onSubmit={handleSubmit}>
          <input className='home__inpunt' id='name' type="text" placeholder='Name Trainer' />
          <button className='home__buton'>Start</button>
        </form>
      </div>
    </div>
  )
}

export default Home