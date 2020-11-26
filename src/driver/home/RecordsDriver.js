import React from 'react';
import CardViajes from '../../components/CardViajes';
import Navigation from '../../components/Navigation';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import moment from "moment";

// config
import { API_ROOT } from '../../config/api-config';

export class RecordsDriver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {map:"https://github.com/CADAN-Developers/CADAN-WHEELS/blob/principalPasajeroMockup/resources/primera.PNG",
        foto:"https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg",
        completados:[]
        }
    }

    componentDidMount(){
        fetch(API_ROOT + '/Completados/' + sessionStorage.getItem("usuario"))
                .then(response => response.json())
                .then(data => {
                    let completadosP = [];
                    data.forEach(function (viaje) {
                        completadosP.push({
                            "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos ,"mapa": viaje.mapa, "ofrecido": viaje.ofrecido
                        })
                    });
                    this.setState({completados:completadosP});
                });
            

    }

    render() {
        const completadosList = this.state.completados.map((viaje) => {
            return (
            <CardViajes key={viaje.idViaje} driver={this.state.foto} name={viaje.pasajero} date={viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')} map={this.state.map} description={viaje.ruta} cost={viaje.costo} rating={viaje.calificacion} />
            );
        });

        
        return (
            <div>
                <Navigation tipoUsuario="Driver" />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {completadosList.map((value) => (
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

export default RecordsDriver;