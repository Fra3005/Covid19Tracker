import React, {useState, useEffect} from "react";
import axios from "axios";

const url = {
    all: "https://disease.sh/v3/covid-19/all",
    countries: "https://disease.sh/v3/covid-19/countries",
  };

export default function GeneralData(){

    const [api, setApi] = useState([]);

    const getCovidApi = async () => {
      const response = await axios.get(url.all);
      setApi(response.data);
    };


    useEffect(() => {
        getCovidApi();
      }, []);

    return (

        <div>General</div>

    );
}