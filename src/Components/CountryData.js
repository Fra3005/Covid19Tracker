import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

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
        <>
        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            <TextField variant="outlined" value={country} onChange={(e)=>{setCountry(e.target.value)}}></TextField>
            <Button variant="contained" onClick={()=>{getApiCountry(country)}} style={{marginLeft:3}}>Cerca</Button>
        </div>
        <div>{api?.country}</div>
        </>
    )
}