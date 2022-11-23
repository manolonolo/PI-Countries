import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryCard from "../CountryCard";
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

    function handleContinent(e){
        dispatch(filterByContinent(e.target.value))
    }
    
    function handlePopulation(e){
        e.preventDefault()
        dispatch(orderByPopulation(e.target.value))
    }
    
    function handleName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
    }
    
    function handleActivity(e){
        dispatch(filterActivity(e.target.value));
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
            {allCountries?.map((c)=>{
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