import React, { Component } from 'react';
import moment from "moment";
import './App.css';
import DriverHome from './driver/home/DriverHome';
import PasajeroHome from './pasajero/home/PasajeroHome'
import UpdatePasajero from './pasajero/home/UpdatePasajero'
import RecordsPasajero from './pasajero/home/RecordsPasajero'
import FormVehiculo from './driver/registroVehiculo/FormVehiculo'
import Login from './components/Login'
import RegistroUsuario from "./pasajero/registroUsuario/RegistroUsuario";


import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

class App extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        const items = [{
            marca: "Renault ",
            matricula: moment(new Date(156464645646)),
            placa: "HIX578",
            capacidad: "5",
            soat: moment(new Date(156464645646))
          }]
          
          const VehiculosView = () => (
            <div>
              <FormVehiculo vehicList={items} /> 
            </div>
          );
        return (
            <div className="App">

                <Router>
                    <div>
                        {/* ENRUTAMIENTO */}

                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/driver" component={DriverHome} />
                            <Route path="/login" component={Login} />
                            <Route path="/pasajero" component={PasajeroHome} />
                            <Route path="/registerVehic" component={VehiculosView} />
                            <Route path="/registerUsuario" component={RegistroUsuario} />
                            <Route path="/UpdatePasajero" component={UpdatePasajero} />
                            <Route path="/RecordsPasajero" component={RecordsPasajero}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;