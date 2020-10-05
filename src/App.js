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
import AgregarSaldo from './components/agregarSaldo/AgregarSaldo';


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

          const AgregarView = () => (
            <div>
              <AgregarSaldo /> 
            </div>
          );
        return (
            <div className="App">

                <Router>
                    <div>
                        {/* ENRUTAMIENTO */}

                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/iniciar" component={Login} />
                            <Route path="/registrar" component={RegistroUsuario} />

                            {/* conductor (si es conductor poner antes /c/ y la pagina que se desee)*/}
                            <Route path="/conductor" component={DriverHome} />
                            <Route path="/c/vehiculos" component={VehiculosView} />
                            
                            {/* pasajero (si es pasajero poner antes /p/ y la pagina que se desee)*/}
                            <Route path="/pasajero" component={PasajeroHome} />
                            <Route path="/p/actualizar" component={UpdatePasajero} />
                            <Route path="/p/registros" component={RecordsPasajero}/>
                            <Route path="/p/depositar" component={AgregarView}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;