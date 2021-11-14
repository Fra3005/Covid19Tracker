import React, { useEffect, useState } from "react";
import axios from "axios";

const url = {
    countries: "https://disease.sh/v3/covid-19/countries/"
}
export default function CountryData () {
    
    const [api, setApi] = useState(null);
    const [country, setCountry] = useState("Italy");

    const getApiCountry = async () =>{

        const response = await axios.get(url.countries + `${country}`);
        setApi(response.data)


    }


    useEffect(()=>{

        getApiCountry(country);


    }, []);


    return (
        <div>{api?.country}</div>
    )
}