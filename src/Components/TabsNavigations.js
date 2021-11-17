import React, {useState} from "react";
import {Tab, Tabs} from '@mui/material';
import {useNavigate} from 'react-router-dom'

export default function TabNav() {
  const navigateTo = useNavigate()
  const [value, setValue] = useState(0)
  
    const handleChange = (e, newValue) => {
        console.log("NEW", newValue)
        navigateTo(newValue)
        setValue(newValue);
      };



  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Tabs
        aria-label="basic tabs example"
        onChange={handleChange}
        value={value}
      >
        <Tab label="General Data" value="/General" tabIndex={0}/>
        <Tab label="Country Data" value="/country" tabIndex={1} />
      </Tabs>
    </div>
  );
}
