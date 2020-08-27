import React from 'react';
import logo from './logo.svg';
import './App.css';
import PasajeroHome from './Pasajero/PasajeroHome'

import {Route, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
            <div className="App">
                <Router>
                    <div>
                      {/* ENRUTAMIENTO */}
                        <Route path="/pasajero" component={PasajeroHome}/>

                    </div>
                </Router>
            </div>
        );
}

export default App;
