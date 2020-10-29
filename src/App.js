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

import EjemploDialog from './components/EjemploDialog';

import Toastr from './components/Toastr'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import MapView  from './components/Maps/MapView';
import UploadImagenes from './components/imagenesDocumentos/UploadImagenes';

// version 2 
import Login2 from './components/login/Login';
import Registrar2 from "./components/registrar/Registrar";


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

              <Route exact path="/noti" component={Toastr} />
              <Route path="/dialog" component={EjemploDialog} />
              
              {/* version 2 */}
              <Route path="/loginv2" component={Login2} />
              <Route path="/registrarv2" component={Registrar2} />


              <Route exact path="/" component={Login} />
              <Route path="/iniciar" component={Login} />
              <Route path="/registrar" component={RegistroUsuario} />
              <Route path="/map" component={MapView} />
              <Route path="/subirImagenes" component={UploadImagenes} />

              {/* conductor (si es conductor poner antes /c/ y la pagina que se desee)*/}
              <Route path="/conductor" component={DriverHome} />
              <Route path="/c/vehiculos" component={VehiculosView} />

              {/* pasajero (si es pasajero poner antes /p/ y la pagina que se desee)*/}
              <Route path="/pasajero" component={PasajeroHome} />
              <Route path="/p/actualizar" component={UpdatePasajero} />
              <Route path="/p/registros" component={RecordsPasajero} />
              
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;