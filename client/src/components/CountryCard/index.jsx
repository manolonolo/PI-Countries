import React from 'react'
import { Link } from 'react-router-dom'

export default function CountryCard({name, continent, image, fifa, id,}) {
  return (
    <Link className='link' to = {`/home/details/${id}`}>
      <div className='card'>
        <div >
          <img className='image' src={image} alt="not found" width='100px' height='50px'/>
          <h3 className='text'>{name}</h3>
          <h5 className='text'>Continent: {continent}</h5>
          <h5 className='text'>fifa: {fifa}</h5>
          <h5 className='text'>id: {id}</h5>
        </div>
      </div>
    </Link>
  );
}