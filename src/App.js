import React, { Component} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import DriverHome from './Driver/DriverHome'
import PasajeroHome from './Pasajero/PasajeroHome'
import Login from './components/Login'
import RegistroVehiculo from './RegistroVehiculo';
import {Route, BrowserRouter as Router} from 'react-router-dom';

class App extends Component {

  constructor(props) {
      super(props);
  }

  render() {
      return (
          <div className="App">
              <Router>
                  <div>
                    {/* ENRUTAMIENTO */}
                      <Route exact path="/" component={Login} />
                      <Route path="/driver" component={DriverHome} />
                      <Route path="/login" component={Login} />
                      <Route path="/pasajero" component={PasajeroHome}/>
                      <Route path="/registerVehic" component={RegistroVehiculo}/>
                      
                  </div>
              </Router>
          </div>
      );
  }
}

export default App;
