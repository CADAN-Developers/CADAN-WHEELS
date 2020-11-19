import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from "moment";


// config
import { API_ROOT } from '../config/api-config';

export class CardViajesOfrecidos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {key:this.props.idViaje,  
        conductor:this.props.name,
        ruta:this.props.description,
        costo:this.props.cost,
        calificacion:this.props.calificacion,
        fecha:this.props.date,
        cupos:this.props.calificacion,
        mapa:this.props.mapa
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
      return (
          <div>
                <Card style={{width: 345, height: 600 }}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" src={this.props.driver}>
                    </Avatar>
                    }
                    title= {this.props.name}
                    subheader= {moment(this.props.date).format('DD-MM-YYYY, h:mm:ss a')}
                />
                <CardMedia
                    style={{height: 200}}
                    image={this.props.map}
                    title="Mapa"
                />
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Descripcion
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {this.props.description}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Costo
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {this.props.cost}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Cupos
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {this.props.cupos}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing style={{justifyContent: 'center'}}>
                        <Button variant="contained" size="medium" color="primary" onClick = {this.handleSubmit}>Agendar</Button>
                </CardActions>
                </Card>
            </div>
      );
  }

  handleSubmit(e) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            pasajero: sessionStorage.getItem("usuario"),
            conductor:this.state.conductor,
            ruta:this.state.ruta,
            costo:this.state.costo,
            calificacion:this.state.calificacion,
            tipoViaje:"AGENDADO",
            fecha:this.state.fecha,
            cupos:0,
            mapa: this.state.mapa,
            ofrecido: this.state.key
        })
    };
    fetch(API_ROOT + '/UpdateViaje/' + this.state.key, requestOptions
    )
    .then(response => {
        alert("Viaje agendado");
        console.log(response);                                   
    })
    .catch(error => {
        console.log(error);
    });
    }

}

export default CardViajesOfrecidos;
