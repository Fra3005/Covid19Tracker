import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Pie } from "react-chartjs-2";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";

const url = {
  countries: "https://disease.sh/v3/covid-19/countries/",
};
export default function CountryData() {
  const [api, setApi] = useState(null);
  const [country, setCountry] = useState("Italy");

  const getApiCountry = async () => {
    const response = await axios.get(url.countries + `${country}`);
    setApi(response.data);
  };

  const state1 = {
    labels: ["Popolazione", "Casi"],
    datasets: [
      {
        label: "Popolazione-Ricoverati",
        backgroundColor: ["rgb(255, 205, 86)", "rgb(255, 99, 132)"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [api?.population, api?.cases],
      },
    ],
  };

  useEffect(() => {
    getApiCountry(country);
  }, [country]);

  const state2 = {
    labels: ["Casi", "Morti"],
    datasets: [
      {
        label: "Casi Giornalieri",
        backgroundColor: ["rgb(255, 99, 132)", "rgba(54, 162, 235, 0.2)"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [api?.cases, api?.deaths],
      },
    ],
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={7.5}>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 4 }}
          >
            <TextField
              variant="outlined"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            ></TextField>
            <Button
              variant="contained"
              onClick={() => {
                getApiCountry(country);
              }}
              style={{ marginLeft: 3 }}
            >
              Cerca
            </Button>
          </div>
        </Grid>
        <Grid item xs={2.5}></Grid>
      </Grid>

      <div>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8} style={{ marginTop: 8 }}>
            <Card sx={{ display: "flex", marginLeft: 10 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h4">
                    {country} Data
                  </Typography>
                  <Typography>
                    <b>Popolazione</b>:{api?.population}
                  </Typography>
                  <Typography>
                    <b>Casi oggi</b>: {api?.todayCases}
                  </Typography>
                  <Typography>
                    <b>Ricoverati oggi</b>:{api?.todayRecovered}
                  </Typography>
                  <Typography>
                    <b>Morti oggi</b>: {api?.todayDeaths}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                ></Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 300, height: 150 }}
                src={`https://flagcdn.com/16x12/${api?.countryInfo?.iso2?.toLowerCase()}.png`}
                srcset={[
                  `https://flagcdn.com/32x24/${api?.countryInfo?.iso2?.toLowerCase()}.png 2x`,
                  `https://flagcdn.com/48x36/${api?.countryInfo?.iso2?.toLowerCase()}.png 3x`,
                ]}
              />
            </Card>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Pie
            data={state1}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Rapporto Popolazione/Casi",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Pie
            data={state2}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Rapporto Casi/Morti",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
