import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Grid,
} from "@mui/material";
import virus from "../assets/virus.jpg";
import ricoverati from "../assets/ricoverati.jpg";

const url = {
  all: "https://disease.sh/v3/covid-19/all",
  countries: "https://disease.sh/v3/covid-19/countries",
};

const continenti = [
  "Italy",
  "USA",
  "UK",
  "Japan",
  "Brazil",
  "Canada",
  "China",
  "Spain",
  "Germany",
  "France",
  "India",
  "Russia",
];

export default function GeneralData() {
  const array = [];
  const array1 = [];
  const [api, setApi] = useState([]);
  const [arrayFiltered, setArrayFiltered] = useState([]);
  const [arrayFilteredByDeath, setArrayFilteredByDeath] = useState([]);
  const [countryInfettati, setCountryInfettati] = useState(0);
  const [totalCases, setTotalCases] = useState(0);
  const [dailyCases, setDailyCases] = useState(0);
  const [deathCases, setDeathCases] = useState(0);
  const [dailyDeath, setDailyDeath] = useState(0);
  const [continent, setContinent] = useState([]);

  const getCovidApi = async () => {
    const response = await axios.get(url.all);
    setCountryInfettati(response.data.affectedCountries);
    setApi(response.data);
    setTotalCases(response.data.cases);
    setDailyCases(response.data.todayCases);
    setDeathCases(response.data.deaths);
    setDailyDeath(response.data.todayDeaths);
  };

  const getCovidCountries = async () => {
    const response = await axios.get(url.countries);
    setContinent(
      response.data.map((item) => ({
        nation: item.country,
        value: item.todayCases,
        total: item.cases,
        death: item.deaths,
      }))
    );
  };

  useEffect(() => {
    getCovidApi();
    getCovidCountries();
  }, []);

  useEffect(() => {
    continent.forEach((element) => {
      let country = element.nation;
      for (let i = 0; i < continenti.length; i++) {
        if (country === continenti[i]) {
          array.push(element);
          array1.push(element);
        }
      }
    });
    sortNationByCases(array);
    setArrayFiltered(array);
    sortNationByDeath(array1);
    setArrayFilteredByDeath(array1);
    console.log("ARRAYCASES", arrayFiltered);
    //sortNationByCases(array);
    //sortNationByDeath(arrayFilteredByDeath);
    //setArrayFilteredByDeath(arrayFilteredByDeath);
  }, [continent]);

  const state1 = {
    labels: [
      arrayFiltered[0]?.nation,
      arrayFiltered[1]?.nation,
      arrayFiltered[2]?.nation,
      arrayFiltered[3]?.nation,
      arrayFiltered[4]?.nation,
      arrayFiltered[5]?.nation,
      arrayFiltered[6]?.nation,
      arrayFiltered[7]?.nation,
      arrayFiltered[8]?.nation,
      arrayFiltered[9]?.nation,
      arrayFiltered[10]?.nation,
    ],
    datasets: [
      {
        label: "Casi Totali",
        backgroundColor: ["rgb(255, 205, 86)", "rgb(255, 99, 132)"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [
          arrayFiltered[0]?.total,
          arrayFiltered[1]?.total,
          arrayFiltered[2]?.total,
          arrayFiltered[3]?.total,
          arrayFiltered[4]?.total,
          arrayFiltered[5]?.total,
          arrayFiltered[6]?.total,
          arrayFiltered[7]?.total,
          arrayFiltered[8]?.total,
          arrayFiltered[9]?.total,
          arrayFiltered[10]?.total,
        ],
      },
    ],
  };

  const state = {
    labels: [
      arrayFilteredByDeath[0]?.nation,
      arrayFilteredByDeath[1]?.nation,
      arrayFilteredByDeath[2]?.nation,
      arrayFilteredByDeath[3]?.nation,
      arrayFilteredByDeath[4]?.nation,
      arrayFilteredByDeath[5]?.nation,
      arrayFilteredByDeath[6]?.nation,
      arrayFilteredByDeath[7]?.nation,
      arrayFilteredByDeath[8]?.nation,
      arrayFilteredByDeath[9]?.nation,
      arrayFilteredByDeath[10]?.nation,
    ],
    datasets: [
      {
        label: "Casi Giornalieri",
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [
          arrayFilteredByDeath[0]?.death,
          arrayFilteredByDeath[1]?.death,
          arrayFilteredByDeath[2]?.death,
          arrayFilteredByDeath[3]?.death,
          arrayFilteredByDeath[4]?.death,
          arrayFilteredByDeath[5]?.death,
          arrayFilteredByDeath[6]?.death,
          arrayFilteredByDeath[7]?.death,
          arrayFilteredByDeath[8]?.death,
          arrayFilteredByDeath[9]?.death,
          arrayFilteredByDeath[10]?.death,
        ],
      },
    ],
  };

  const sortNationByCases = (a) => {
    a.sort(function (a, b) {
      return b.total - a.total;
    });
  };

  const sortNationByDeath = (a) => {
    a.sort(function (a, b) {
      return b.death - a.death;
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Card sx={{ width: 450, marginTop: 8, marginBottom: 5 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={virus}
              alt="green iguana"
            />
            <CardContent>
              <Typography>
                <b>Casi Totali</b>: {totalCases} milioni
              </Typography>
              <Typography>
                <b>Morti Totali</b>: {deathCases} milioni
              </Typography>
              <Typography>
                <b>Nazioni Infettate</b>: {countryInfettati}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ width: 450, marginTop: 8, marginBottom: 5 }}>
          <CardActionArea>
            <CardMedia component="img" height="140" image={ricoverati} />
            <CardContent>
              <Typography>
                <b>Ricoveri Totali</b>: {api.recovered} milioni
              </Typography>
              <Typography>
                <b>Ricoveri Giornalieri</b>: {api.todayRecovered} mila
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <Grid style={{ display: "flex", maxWidth: 750 }}>
        <Bar
          data={state1}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Most Covid19 cases in the World",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
        <Pie
          style={{ marginLeft: 150 }}
          data={state1}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Most Covid19 cases in the World",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </Grid>
      <Grid style={{ display: "flex", maxWidth: 750 }}>
        <Bar
          data={state}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Most Covid19 deaths in the World",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </Grid>
    </>
  );
}
