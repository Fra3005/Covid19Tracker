import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Pie } from "react-chartjs-2";


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

    const state1 = {
        labels: [ "Popolazione", "Ricoverati"],
        datasets: [
          {
            label: "Popolazione-Ricoverati",
            backgroundColor: [
              
              'rgb(255, 205, 86)'
            ] ,
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: [api?.populations, api?.recovered],
          },
        ],
      };
    


    useEffect(()=>{

        getApiCountry(country);


    }, [country]);


    return (
        <>
        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            <TextField variant="outlined" value={country} onChange={(e)=>{setCountry(e.target.value)}}></TextField>
            <Button variant="contained" onClick={()=>{getApiCountry(country)}} style={{marginLeft:3}}>Cerca</Button>
        </div>
        <div>
        <Pie
        data={state1}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Daily death in the world "
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
        </div>
        </>
    )
}