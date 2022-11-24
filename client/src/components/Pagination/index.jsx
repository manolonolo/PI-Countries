import React from 'react'
import './index.css'

export default function Paginado({countriesPerPage, allCountries, paginado}) {
    const pageNumbers = []
    for (let i = 0; i < Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return (
        <nav className='cnt'>
            <div >
                {pageNumbers?.map(number => (
                    
                    <button className='btn' key={number} onClick={()=> paginado(number)}>{number}</button>
                    
                ))}
            </div>
        </nav>
    )
}
