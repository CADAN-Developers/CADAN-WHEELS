import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';


import DriverHome from './Driver/DriverHome'

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
                      
                  </div>
              </Router>
          </div>
      );
  }
}

export default App;
