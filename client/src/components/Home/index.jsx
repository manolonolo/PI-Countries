import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryCard from "../CountryCard";
import Paginado from "../Pagination";
import NavBar from "../Nav";
import Header from "../Header";
import {
    getAllCountries,
    getActivity,
    filterByContinent,
    orderByName,
    orderByPopulation,
    filterActivity
} from "../../Redux/actions";
import './index.css';

export default function Home() {

    const dispatch = useDispatch();

    const allCountries = useSelector((state) => state.countries);

    useEffect(() => {
        dispatch(getActivity)
        dispatch(getAllCountries())
    }, [dispatch]);

    const [order, setOrder] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    let countriesPerPage = 10;

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    if (currentPage === 1) {countriesPerPage = 9}

    if (currentPage >= 2) {countriesPerPage = 10}

    const lastCountry = currentPage * countriesPerPage;

    const firstCountry = lastCountry - countriesPerPage;

    const currentCountries = allCountries.slice(firstCountry, lastCountry);


    function handleContinent(e){
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
    }
    
    function handlePopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }
    
    function handleName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }
    
    function handleActivity(e){
        dispatch(filterActivity(e.target.value));
        setCurrentPage(1);
    }

    return(
        <div className='Home'>
            <Header/>
            <div className='navbar'>
                <NavBar
                    byName={handleName}
                    byContinent={handleContinent}
                    byPopulation={handlePopulation}
                    byActivities={handleActivity}
                /> 
            </div>
            <div className='navbar'>
                <Paginado
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paginado= {paginado}
                />
            </div>
            {currentCountries?.map((c)=>{
                return(
                    <div className='container'>
                        <CountryCard
                            image={c.image}
                            name={c.name}
                            continent={c.continent}
                            fifa={c.fifa}
                            key={c.id}
                            id={c.id}
                        />                  
                    </div>          
            );
          })}
        </div>
    )
}