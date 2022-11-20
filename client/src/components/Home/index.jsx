import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CountryCard from "../CountryCard";
import { getAllCountries } from "../../Redux/actions";
import './index.css';

export default function Home() {

    const dispatch = useDispatch();

    const allCountries = useSelector((state) => state.countries);

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch]);

    return(
        <div>
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