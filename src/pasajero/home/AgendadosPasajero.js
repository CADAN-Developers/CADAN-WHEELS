import React from 'react';
import CardViajesAgendados from '../../components/CardViajesAgendados';
import Navigation from '../../components/Navigation';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import moment from "moment";

export class AgendadosPasajero extends React.Component {

    constructor(props) {
        super(props);
        this.state = {map:"https://github.com/CADAN-Developers/CADAN-WHEELS/blob/principalPasajeroMockup/resources/primera.PNG",
        foto:"https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg",
        agendados:[]
        }
    }

    componentDidMount(){
        fetch('https://cadanback.herokuapp.com/AgenadosPas/' + sessionStorage.getItem("usuario"))
                .then(response => response.json())
                .then(data => {
                    let AgendadosP = [];
                    data.forEach(function (viaje) {
                        AgendadosP.push({
                            "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos
                        })
                    });
                    this.setState({agendados:AgendadosP});
                });
            

    }

    render() {
        const agendadosList = this.state.agendados.map((viaje) => {
            return (
            <CardViajesAgendados key={viaje.idViaje} driver={this.state.foto} name={viaje.conductor} date={viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')} map={this.state.map} description={viaje.ruta} cost={viaje.costo} rating={viaje.calificacion} />
            );
        });

        
        return (
            <div>
                <Navigation tipoUsuario="Passenger" />
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

export default AgendadosPasajero;