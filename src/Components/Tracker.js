import React, { useState, useEffect } from "react";
import Navigations from "./AppBar";
import axios from "axios";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
const url = {
  all: "https://disease.sh/v3/covid-19/all",
  countries: "https://disease.sh/v3/covid-19/countries",
};
export default function Tracker() {
  const [api, setApi] = useState([]);
  const [value, setValue] = useState(0)

  const getCovidApi = async () => {
    const response = await axios.get(url.all);
    setApi(response.data);
  };

  useEffect(() => {
    getCovidApi();
  }, []);

  return (
    <div>
      <Navigations />
      <div>{JSON.stringify(api)}</div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" />
        <BottomNavigationAction label="Favorites" />
        <BottomNavigationAction label="Nearby" />
      </BottomNavigation>
    </div>
  );
}
