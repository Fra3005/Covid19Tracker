import "./App.css";
import Navigations from "./Components/AppBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Tracker from "./Components/Tracker";
function App() {
  return (
    <div className="App">
      <Tracker />
    </div>
  );
}

export default App;
