import React, { Component } from 'react';
import moment from "moment";
import './App.css';
import DriverHome from './Driver/home/DriverHome';
import PasajeroHome from './pasajero/home/PasajeroHome'
import UpdatePasajero from './pasajero/home/UpdatePasajero'
import RecordsPasajero from './pasajero/home/RecordsPasajero'
import FormVehiculo from './Driver/registroVehiculo/FormVehiculo'
import Login from './components/Login'
import RegistroUsuario from "./pasajero/registroUsuario/RegistroUsuario";


import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            isLog : false

        }
        this.handleClick = this.handleClick.bind(this)
        
     }

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

        const loginView = () => (
            <div>
                <Login handleClick={this.handleClick} />
            </div>
        );

        const pasView = () => (
            <div>
                <PasajeroHome />
            </div>
        );

        const vistaprevia = this.state.isLog ? pasView : loginView

        return (

            

            <div className="App">

                <Router>
                    <div>
                        {/* ENRUTAMIENTO */}

                        <Switch>
                            <Route exact path="/" component={vistaprevia} />
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


    handleClick(e) {
        console.log("regresa a APP ")
        this.setState({ isLog : true})
    }
}

export default App;