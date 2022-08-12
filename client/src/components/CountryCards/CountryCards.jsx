import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../../redux/actions';
import CountryCard from '../CountryCard/CountryCard';
import Pagination from '../Pagination/Pagination';


export default function CountryCards (){

    const allCountries = useSelector(state => state.country);
    console.log(allCountries); //con estos characters que me traigo del state (luego de haber disparado el getCharacters) renderizo cada card en este componente

    const dispatch = useDispatch();

    //PAGINADO
    const [order, setOrder] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(15)
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => { //reemplaza componentDidMount. Lo que quiero hacer en este caso es, cuando se monte por primera vez, dispare la action getCharacters
        dispatch(getCountries());
    }, [dispatch]);

    return(
        <div>
            <Pagination countriesPerPage={countriesPerPage} allCountries={allCountries.length} pagination={pagination} />
            {
                currentCountries && currentCountries.map( (el) => {
                    return (
                        <div>
                            <CountryCard img={el.img} name={el.name} origin={el.origin} species={el.species} episodes={el.episodes} key={el.id} />
                        </div>
                    )
                })
            }    
        </div>
        
    )
}