import React, {useState} from "react";
import {Tab, Tabs} from '@mui/material';

export default function TabNav() {

  const [value, setValue] = useState(0)
  
    const handleChange = (newValue) => {
        setValue(newValue);
        console.log("NEW", newValue)    
      };



  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Tabs
        value={value}
        aria-label="basic tabs example"
        onChange={handleChange}
        
      >
        <Tab label="General Data" href="/General" tabIndex={0}/>
        <Tab label="Country Data" href="/country" tabIndex={1} />
      </Tabs>
    </div>
  );
}
