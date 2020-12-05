import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


export class CardViajes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {key:this.props.idViaje,  
        conductor:this.props.name,
        ruta:this.props.description,
        costo:this.props.cost,
        calificacion:this.props.calificacion,
        fecha:this.props.date,
        cupos:this.props.calificacion,
        mapa:this.props.mapa,
        open: false,
        value : this.props.calificacion
    }
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCalificar = this.handleCalificar.bind(this);
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
                    subheader= {this.props.date}
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
                </CardContent>
                <CardActions disableSpacing>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Calificacion del viaje</Typography>
                        <Rating
                        name="read-only"
                        defaultValue={this.props.rating}
                        precision={0.5}
                        readOnly 
                        onChange={this.handleRateChange}
                        />
                    </Box>
                    {this.props.tipoUsuario === "pasajero" ?
                        <Button variant="contained" size="medium" color="primary" onClick = {this.handleSubmit}>Calificar</Button>:
                        <div></div>}
                </CardActions>
                </Card>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Califica</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Califica tu experiencia en tu viaje.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Calificacion tu viaje</Typography>
                        <Rating
                        name="read-only"
                        defaultValue={this.state.calificacion}
                        precision={0.5} 
                        onChange={this.handleRateChange}
                        />
                    </Box>
          <Button onClick={this.handleCalificar} color="primary">
            Confirmar
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
            </div>
      );
  }

  handleRateChange(e) {
    this.setState({
        value: e.target.value
    });
  }

  handleSubmit(e){
    this.setState({open:true});
  }

  handleClose(e){
    this.setState({open:false});
  }

  handleCalificar(e){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            pasajero: sessionStorage.getItem("usuario"),
            conductor:this.state.conductor,
            ruta:this.state.ruta,
            costo:this.state.costo,
            calificacion:this.state.value,
            tipoViaje:"COMPLETADO",
            fecha:this.state.fecha,
            cupos:0,
            mapa: this.state.mapa,
            ofrecido: this.state.key
        })
    };

    fetch(API_ROOT + '/UpdateViaje/' + this.state.key, requestOptions
    )
    .then(response => {
        alert("Califiacion Guardada");
        console.log(response);                                   
    })
    .catch(error => {
        console.log(error);
    });

    this.setState({open:false});

  }

}

export default CardViajes;
