import React, { Component} from 'react';
import './App.css';
import DriverHome from './driver/home/DriverHome';
import RegistroVehiculo from './driver/registroVehiculo/RegistroVehiculo';
import PasajeroHome from './pasajero/home/PasajeroHome'
import Login from './components/Login'
import RegistroUsuario from "./pasajero/registroUsuario/RegistroUsuario";

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
                      <Route path="/registerUsuario" component={RegistroUsuario} />


                  </div>
              </Router>
          </div>
      );
  }
}

export default App;