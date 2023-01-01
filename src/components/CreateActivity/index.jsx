import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postActivity, getAllCountries } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import validate from './validate';
import './index.css'

export default function CreateActivity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {countries} = useSelector((state) => {return state})
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: []
  })

  function handleSeason(e){
    setInput({
      ...input,
      season: e.target.value
    })
  }

  const handleDifficulty = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      difficulty: e.target.value
    })
  }
  
  function handleDuration(e){
    setInput({
      ...input,
      duration: e.target.value
    })
  }

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleCountry = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      countries: [...input.countries, e.target.value]
    })
  }

  useEffect(() => {
    dispatch(postActivity())
    dispatch(getAllCountries())
  }, [dispatch])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    /*if( !input.name || !input.difficulty || !input.duration || !input.season || !input.countries){
      return alert('All filds need to be completed')*/
    if(!input.name) alert('need name')
    else if(!input.difficulty) alert('You need to chose a level of difficulty.')
    else if(!input.duration) alert('You need to chose a time duration.')
    else if(!input.season) alert('You need to chose a season.')
    else if(!input.countries) alert('You need to chose at least one country.')
    else {
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    
    dispatch(postActivity(input));
    alert('Activity created!')
    setInput({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      countries: []
    })
    navigate('/home')
  }
  }
    
  const handleDelete = (el) => {
    setInput({
      ...input,
      countries: input.countries.filter((country) => country !== el )
    })
  }


  return (
    <div className='createbg'>
      <Link to={'/home'}><button className='btncreate'>BACK HOME</button></Link>
    <form className='cntcreate' onSubmit={(e) => handleSubmit(e)}>
    <h1 className='titlecreate'>CREATE ACTIVITY</h1>
      <div>
        <label htmlFor="">Name:</label>
        <input
        type={'text'}
        name = {'name'}
        value = {input.name}
        required
        onChange={(e) => handleChange(e)}
        placeholder = 'activity name...'
        className='inputname'
        />
      </div>

      <div>
        <label>Difficulty:</label>
        <select className='selectcreate' value={input.difficulty} onChange={(e) => handleDifficulty(e)}>
        <option key={'difficulty'}>Difficulty...</option>
        <option value={1} key={'1'}>1</option>
        <option value={2} key={'2'}>2</option>
        <option value={3} key={'3'}>3</option>
        <option value={4} key={'4'}>4</option>
        <option value={5} key={'5'}>5</option>
        </select>        
      </div>      
      
      <div>
        <label>Duration:</label>
        <select className='selectcreate' onChange={(e) => handleDuration(e)}>
        <option key={'duration'}>Duration...</option>
        <option value={'1hr'} key={'1hr'}>1hr</option>
        <option value={'2hs'} key={'2hs'}>2hs</option>
        <option value={'3hs'} key={'3hs'}>3hs</option>
        <option value={'4hs'} key={'4hs'}>4hs</option>
        <option value={'5hs'} key={'5hs'}>5hs</option>
        <option value={'6hs'} key={'6hs'}>6hs</option>
        <option value={'7hs'} key={'7hs'}>7hs</option>
        <option value={'8hs'} key={'8hs'}>8hs</option>
        <option value={'9hs'} key={'9hs'}>9hs</option>
        <option value={'10hs'} key={'10hs'}>10hs</option>
        <option value={'11hs'} key={'11hs'}>11hs</option>
        <option value={'12hs'} key={'12hs'}>12hs</option>
        </select>
      </div>
      <div>
        <label>Season:</label>
        <select className='selectcreate' onChange={(e) => handleSeason(e)}>
        <option key={'season'}>Season...</option>
        <option value={'Summer'} key={'Summer'}>Summer</option>
        <option value={'Fall'} key={'Fall'}>Fall</option>
        <option value={'Winter'} key={'Winter'}>Winter</option>
        <option value={'Spring'} key={'Spring'}>Spring</option>     
        </select>
      </div>
      <div>
      <label>Countries:</label>
        <select className='selectcreate' onChange={(e) => handleCountry(e)}>
            <option key={'Country'}>Country...</option>
          {countries.map((country) => (
            <option value={country.id} key={country.id}>{country.name}</option>
          ))}
        </select>
        {/* <button type="submit">CREATE</button> */}
      {errors.name || !input.name || !input.countries/*|| !input.difficulty || !input.duration || !input.season*/
      ? <button className='btncreate' type="submit" disabled={true}>CREATE</button> 
      : <button className='btncreate' type="submit">CREATE</button>}
        {errors.name && (<p>{errors.name}</p>)}
    <div>
    {
      input.countries.map(el =>
        <div className='cntdelete'>
          <button className='btndelete' onClick={()=>handleDelete(el)}>x</button>
          <p>{el}</p>
        </div>
        )
      }
    </div>
    </div>
    </form>
    </div>
  )
}
