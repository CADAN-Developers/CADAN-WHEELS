import React, { Component} from 'react';
import './App.css';
import DriverHome from './Driver/DriverHome'
import {RegistroVehiculo} from './RegistroVehiculo';

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
                      <Route path="/driver" component={DriverHome}/>
                      <Route path="/registerVehic" component={RegistroVehiculo}/>
                      
                  </div>
              </Router>
          </div>
      );
  }
}

export default App;
