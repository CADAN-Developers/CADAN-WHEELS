import React from 'react';
import CardViajesOfrecidos from '../../components/CardViajesOfrecidos';
import Navigation from '../../components/Navigation';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import moment from "moment";

// config
import { API_ROOT } from '../../config/api-config';

export class OfecidosPasajero extends React.Component {

    constructor(props) {
        super(props);
        this.state = {map:"https://github.com/CADAN-Developers/CADAN-WHEELS/blob/principalPasajeroMockup/resources/primera.PNG",
        foto:"https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg",
        ofrecidos:[]
        }
    }

    componentDidMount(){
        fetch(API_ROOT + '/ViajesOfrecidos')
            .then(response => response.json())
            .then(data => {
                let ofrecidosC = [];
                data.forEach(function (viaje) {
                    ofrecidosC.push({
                        "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos
                    })
                });
                this.setState({ofrecidos:ofrecidosC});
            });
            

    }

    render() {
        const ofrecidosList = this.state.ofrecidos.map((viaje) => {
            return (
            <CardViajesOfrecidos key={viaje.idViaje} idViaje={viaje.idViaje} driver={this.state.foto} name={viaje.conductor} date={viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')} map={this.state.map} description={viaje.ruta} cost={viaje.costo} rating={viaje.calificacion} cupos={viaje.cupos}/>
            );
        });

        
        return (
            <div>
                <Navigation tipoUsuario="Passenger" />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {ofrecidosList.map((value) => (
                                <Grid key={value} item>
                                    {value}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );


    }

}

export default OfecidosPasajero;