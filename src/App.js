import React, { Component } from 'react';
import moment from "moment";
import './App.css';
import DriverHome from './driver/home/DriverHome';
import RecordsDriver from './driver/home/RecordsDriver';
import OfrecidosDriver from './driver/home/OfrecidosDriver';
import AgendadosDriver from './driver/home/AgendadosDriver';
import EnCursoDriver from './driver/home/EnCursoDriver';
import PasajeroHome from './pasajero/home/PasajeroHome'
import UpdatePasajero from './pasajero/home/UpdatePasajero'
import RecordsPasajero from './pasajero/home/RecordsPasajero'
import FormVehiculo from './driver/registroVehiculo/FormVehiculo'
// import Login from './components/Login'
// import RegistroUsuario from "./pasajero/registroUsuario/RegistroUsuario";

import OfrecidosPasajero from './pasajero/home/OfrecidosPasajero'
import AgendadosPasajero from './pasajero/home/AgendadosPasajero'

import EjemploDialog from './components/EjemploDialog';


import Toastr from './components/Toastr'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import MapView  from './components/Maps/MapView';
import UploadImagenes from './components/imagenesDocumentos/UploadImagenes';

// version 2 
import Login2 from './components/login/Login';
import Registrar2 from "./components/registrar/Registrar";


class App extends Component {

  constructor(props){
        super(props);
        this.state = {
            isLog : false,
            items : []
            }
  this.handleClick = this.handleClick.bind(this)
}


 render() {  
          const VehiculosView = () => (
            <div>
              <FormVehiculo vehicList={this.state.items} /> 
            </div>
        );

        // const loginView = () => (
        //     <div>
        //         <Login handleClick={this.handleClick} />
        //     </div>
        // );

        const pasView = () => (
            <div>
                <PasajeroHome />
            </div>
        );

        // const vistaprevia = this.state.isLog ? pasView : loginView
        
    return (
      <div className="App">

        <Router>
          <div>
            {/* ENRUTAMIENTO */}

            <Switch>

              <Route exact path="/noti" component={Toastr} />
              <Route path="/dialog" component={EjemploDialog} />
              
              {/* version 2 */}
              {/* <Route path="/loginv2" component={Login2} />
              <Route path="/registrarv2" component={Registrar2} /> */}

              
              <Route exact path="/" component={Login2} />
              <Route path="/iniciar" component={Login2} />
              <Route path="/registrar" component={Registrar2} />
              <Route path="/map" component={MapView} />
              <Route path="/subirImagenes" component={UploadImagenes} />

              {/* conductor (si es conductor poner antes /c/ y la pagina que se desee)*/}
              <Route path="/conductor" component={DriverHome} />
              <Route path="/c/vehiculos" component={VehiculosView} />
              <Route path="/c/registros" component={RecordsDriver} />
              <Route path="/c/ofrecidos" component={OfrecidosDriver} />
              <Route path="/c/agendados" component={AgendadosDriver} />
              <Route path="/c/enCurso" component={EnCursoDriver} />
              

              {/* pasajero (si es pasajero poner antes /p/ y la pagina que se desee)*/}
              <Route path="/pasajero" component={PasajeroHome} />
              <Route path="/p/actualizar" component={UpdatePasajero} />
              <Route path="/p/registros" component={RecordsPasajero} />
              <Route path="/p/ofrecidos" component={OfrecidosPasajero} />
              <Route path="/p/agendados" component={AgendadosPasajero} />
              
            </Switch>
          </div>
        </Router>
      </div>
    );
    }

    async componentDidMount(){
        const url = "https://cadanback.herokuapp.com/getVehiculos?conductor=daniel@mail.com"
        //axios.get(url).then(res => res.json()).then(res => console.log(res));
        //fetch(url).then(res => console.log(res)).catch(error => console.log("JOHANN ES RE GURRERO "+ error));
        var list=[];
        await fetch(url).then(res => res.json())
                    .then((result) => {
                            result.forEach(element => { list.push(element)
                                
                            });
                                
                          
                        
                    });
        this.setState({
            items: list
        });

    }

    handleClick(e) {
      console.log("regresa a APP ")
      this.setState({ isLog : true})
    }
}

export default App;