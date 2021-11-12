import React, {useState} from "react";
import {Tab, Tabs} from '@mui/material';
import GeneralData from './GeneralData';


export default function TabNav() {

  const [value, setValue] = useState(0)


    const handleChange = (event, newValue) => {
        setValue(newValue);
      };



  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Tabs
        value={value}
        aria-label="basic tabs example"
        onChange={handleChange}
        
      >
        <Tab label="General Data" children={<GeneralData/>}/>
        
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </div>
  );
}
