import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../Redux/actions';
import './index.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [order, setOrder]= useState('');

  function handleChange(e){
    e.preventDefault()
    setName(e.target.value)
  }

  
  function handleSubmit(e){
    e.preventDefault()
    if(name !== ''){
      dispatch(getCountryByName(name))
      setName('')
      setOrder(`Ordenado: ${e.target.value}`)
      } else {
        alert('Please enter a country name')
      }
  }

  return (
    <div>
      <input
      className='inputsearch'
      type = "text"
      value = {name}
      placeholder='Search...'
      onChange={(e)=>handleChange(e)}
      />
      <button className='btnsearch' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
    </div>
  )
}
