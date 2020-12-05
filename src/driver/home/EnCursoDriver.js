import React from 'react';
import CardViajesEnCurso from '../../components/CardViajesEnCurso';
import Navigation from '../../components/Navigation';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import moment from "moment";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// config
import { API_ROOT } from '../../config/api-config';

export class EnCursoDriver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {map:"https://github.com/CADAN-Developers/CADAN-WHEELS/blob/principalPasajeroMockup/resources/primera.PNG",
        foto:"https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg",
        enCurso:[]
        }
    }

    componentDidMount(){
        fetch(API_ROOT + '/EnCursoCon/' + sessionStorage.getItem("usuario"))
            .then(response => response.json())
            .then(data => {
                let enCursoP = [];
                data.forEach(function (viaje) {

                    enCursoP.push({
                        "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": viaje.fecha, "cupos": viaje.cupos, "mapa": viaje.mapa, "ofrecido": viaje.ofrecido
                    })
                });
                this.setState({ enCurso: enCursoP });
            })
            .catch(function (error) {
            });
            

    }

    render() {
        const enCursoList = this.state.enCurso.map((viaje) => {
            return (
                <CardViajesEnCurso key={viaje.idViaje} tipoUsuario="Driver" idViaje={viaje.idViaje} driver={this.state.foto} name={viaje.pasajero} date={viaje.fecha} map={this.state.map} description={viaje.ruta} cost={viaje.costo} rating={viaje.calificacion} cupos={viaje.cupos} mapa={viaje.mapa} ofrecido={viaje.ofrecido}/>
                );
            });

        
        return (
            <div>
                <Navigation tipoUsuario="Driver" />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {enCursoList.map((value) => (
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

export default EnCursoDriver;