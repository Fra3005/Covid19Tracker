import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography, CardActionArea, CardMedia } from "@mui/material";
import virus from '../assets/virus.jpg';
import ricoverati from '../assets/ricoverati.jpg';


const url = {
  all: "https://disease.sh/v3/covid-19/all",
};

export default function GeneralData() {
  const [api, setApi] = useState([]);
  const [countryInfettati, setCountryInfettati] = useState(0);
  const [totalCases, setTotalCases] = useState(0);
  const [dailyCases, setDailyCases] = useState(0);
  const [deathCases, setDeathCases] = useState(0);
  const [dailyDeath, setDailyDeath] = useState(0);

  const getCovidApi = async () => {
    const response = await axios.get(url.all);
    setCountryInfettati(response.data.affectedCountries);
    setApi(response.data)
    setTotalCases(response.data.cases);
    setDailyCases(response.data.todayCases);
    setDeathCases(response.data.deaths);
    setDailyDeath(response.data.todayDeaths);
    
  };

  const state = {
    labels: ["Casi Giornalieri"],
    datasets: [
      {
        label: "Casi Giornalieri",
        backgroundColor: [
          'rgb(255, 99, 132)',
          
        ] ,
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [dailyCases],
      },
    ],
  };

  const state1 = {
    labels: [ "Morti Giornalieri"],
    datasets: [
      {
        label: "Morti Giornalieri",
        backgroundColor: [
          
          'rgb(255, 205, 86)'
        ] ,
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [ dailyDeath],
      },
    ],
  };

  useEffect(() => {
    getCovidApi();
  }, []);

  return (
    <>
    <div style={{display:"flex", justifyContent:"space-evenly"}}>
      <Card sx={{ width: 450, marginTop:8, marginBottom:5 }}>
        <CardActionArea>
        <CardMedia
         component="img"
         height="140"
         image={virus}
         alt="green iguana"/>
        <CardContent>
          <Typography><b>Casi Totali</b>: {totalCases} milioni</Typography>
          <Typography><b>Morti Totali</b>: {deathCases} milioni</Typography>
          <Typography><b>Nazioni Infettate</b>: {countryInfettati}</Typography>
        </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ width: 450, marginTop:8, marginBottom:5 }}>
        <CardActionArea>
        <CardMedia
         component="img"
         height="140"
         image={ricoverati}
         alt="green iguana"/>
        <CardContent>
          <Typography><b>Ricoveri Totali</b>: {api.recovered} milioni</Typography>
          <Typography><b>Ricoveri Giornalieri</b>: {api.todayRecovered} mila</Typography>
        </CardContent>
        </CardActionArea>
      </Card>

    </div>
    <div style={{display:"flex", maxWidth:750}}>
      <Bar
        data={state}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Daily cases in the world"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
      <Bar
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
  );
}
