import React, { useState, useEffect } from "react";
import Navigations from "./AppBar";
import TabNav from "./TabsNavigations";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

export default function Tracker() {
  return (
    <div>
      <Navigations />
      <div>
        <TabNav />
      </div>
    </div>
  );
}
