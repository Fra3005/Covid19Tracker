import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import GeneralData from "./Components/GeneralData";

import Tracker from "./Components/Tracker";
function App() {
  return (
    <Router>
    <Tracker />
    <Routes>
      <Route path="/General" element={ <GeneralData />}> 
      </Route>     
    </Routes>
  </Router>
  
  );
}

export default App;
