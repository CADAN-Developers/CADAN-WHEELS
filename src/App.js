import React, { Component} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import DriverHome from './Driver/DriverHome'
import Login from './components/Login'
import { RegistroVehiculo } from './RegistroVehiculo';
import RegistroUsuario from "./RegistroUsuario/RegistroUsuario";
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
                      <Route exact path="/" component={DriverHome}/>
                      <Route path="/driver" component={DriverHome} />
                      <Route path="/login" > <Login/>  </Route>
                      <Route path="/driver" component={DriverHome}/>
                      <Route path="/registerVehic" component={RegistroVehiculo} />
                      <Route path="/registerUsuario" component={RegistroUsuario} />  
                  </div>
              </Router>
          </div>
      );
  }

}

export default App;
