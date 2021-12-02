import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Pie } from "react-chartjs-2";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Grid,
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
    labels: ["Popolazione", "Ricoverati"],
    datasets: [
      {
        label: "Popolazione-Ricoverati",
        backgroundColor: ["rgb(255, 205, 86)"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [api?.populations, api?.recovered],
      },
    ],
  };

  useEffect(() => {
    getApiCountry(country);
  }, [country]);

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
        <Grid item xs={2.5}>
          <div style={{ margin: 15 }}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  alt=""
                  src={`https://flagcdn.com/16x12/${api?.countryInfo?.iso2?.toLowerCase()}.png`}
                  srcset={[
                    `https://flagcdn.com/32x24/${api?.countryInfo?.iso2?.toLowerCase()}.png 2x`,
                    `https://flagcdn.com/48x36/${api?.countryInfo?.iso2?.toLowerCase()}.png 3x`,
                  ]}
                />
                <CardContent>
                  <Typography>
                    <b>Popolazione</b>:{api?.population}
                  </Typography>
                  <Typography>
                    <b>Casi oggi</b>: {api?.todayCases}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </Grid>
      </Grid>
      <div></div>

      <div>
        <Grid xs={6} sx={{ marginLeft: 2, marginTop: 8 }}>
          <Card>
            <CardActionArea>
              <CardMedia component="img" height="140" alt="" />
              <CardContent>
                <Typography>
                  <b>Popolazione</b>:{api?.population}
                </Typography>
                <Typography>
                  <b>Casi oggi</b>: {api?.todayCases}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {/* <Pie
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
      /> */}
      </div>
    </>
  );
}
