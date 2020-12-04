import React from 'react';
import CardViajesAgendados from '../../components/CardViajesAgendados';
import Navigation from '../../components/Navigation';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import moment from "moment";

// config
import { API_ROOT } from '../../config/api-config';

export class AgendadosDriver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {map:"https://github.com/CADAN-Developers/CADAN-WHEELS/blob/principalPasajeroMockup/resources/primera.PNG",
        foto:"https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg",
        agendados:[]
        }
    }

    componentDidMount(){
        fetch(API_ROOT + '/AgenadosCon/' + sessionStorage.getItem("usuario"))
                .then(response => response.json())
                .then(data => {
                    let AgendadosP = [];
                    data.forEach(function (viaje) {
                        AgendadosP.push({
                            "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos, "mapa": viaje.mapa, "ofrecido": viaje.ofrecido
                        })
                    });
                    this.setState({agendados:AgendadosP});
                });
            

    }

    render() {
        const agendadosList = this.state.agendados.map((viaje) => {
            return (
            <CardViajesAgendados key={viaje.idViaje} idViaje={viaje.idViaje} driver={this.state.foto} name={viaje.pasajero} date={viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')} map={this.state.map} description={viaje.ruta} cost={viaje.costo} rating={viaje.calificacion} mapa= {viaje.mapa} idOfrecido= {viaje.idOfrecido}/>
            );
        });

        
        return (
            <div>
                <Navigation tipoUsuario="Driver" />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {agendadosList.map((value) => (
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

export default AgendadosDriver;