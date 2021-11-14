import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography, CardActionArea, CardMedia } from "@mui/material";
import virus from '../assets/virus.jpg'


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
    setTotalCases(response.data.cases);
    setDailyCases(response.data.todayCases);
    setDeathCases(response.data.deaths);
    setDailyDeath(response.data.todayDeaths);
    
  };

  const state = {
    labels: ["Casi Giornalieri", "Morti Giornalieri"],
    datasets: [
      {
        label: "Dati",
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ] ,
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [dailyCases, dailyDeath],
      },
    ],
  };

  useEffect(() => {
    getCovidApi();
  }, []);

  return (
    <>
    <div>
      <Card sx={{ maxWidth: 450, marginTop:8, marginBottom:5 }}>
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

    </div>
    <div style={{display:"flex", maxWidth:900}}>
      <Bar
      style={{width:"100px"}}
        data={state}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Covid19 Data"
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
