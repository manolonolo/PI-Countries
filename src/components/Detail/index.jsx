import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCountryById } from '../../Redux/actions'
import { useEffect } from 'react'
import './index.css'

export default function Details() {
  const dispatch = useDispatch();
  const {id} = useParams();
  
  const countryDetail = useSelector((state) => state.countryId)
  useEffect(()=>{
    dispatch(getCountryById(id))
  },[dispatch,id])

  return (
    <div className='detailbg'>
      <Link to='/home'><button className='btndetail'>Back HOME</button></Link>
      {
        countryDetail?
        <div>
            <div className='cntdetail'>
              <h1>{countryDetail.name}</h1>
              <img className='imgdetail' src={countryDetail.image} alt="not found"/>
              <h3>Continent: {countryDetail.continent}</h3>
              <h3>Capital: {countryDetail.capital}</h3>
              <h4>Area: {countryDetail.area} km2</h4>
              <h4>Subregion: {countryDetail.subregion}</h4>
              <h4>Population: {countryDetail.population}</h4>
              <h4>Fifa: {countryDetail.fifa}</h4>
              <h3>Id: {countryDetail.id}</h3>
            </div>
          <div>
            {
              countryDetail.activities?.map((c) =>{
                return(
                  <div className='cntactivity'>
                    <h5>Activities: {c.name}</h5>
                    <h5>Difficulty: {c.difficulty}</h5>
                    <h5>Duration: {c.duration}</h5>
                    <h5>Season: {c.season}</h5>
                  </div>
                )
              })
            }
          </div>
          
        </div>:
        <p>Loading...</p>
      }
    </div>
      )
}
