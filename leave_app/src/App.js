

import './App.css';
import Navbar from './Components/Navbar';
import Otp from './Otp';
import Verification from './Screens/Verification';
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomeScreen from './Screens/HomeScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Route path="/" exact component={Otp} />
        <Route path="/homescreen" exact component={HomeScreen} />



        <Route path="/verification/:phonenumber" exact component={Verification} />

      </div>
    </Router>
  );
}

export default App;
