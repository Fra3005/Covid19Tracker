import React, { useState, useEffect } from "react";
import Navigations from "./AppBar";
import TabNav from "./TabsNavigations";

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
