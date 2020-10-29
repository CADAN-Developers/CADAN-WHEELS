import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



export class CardViajesAgendados extends React.Component {

  constructor(props) {
    super(props);
    this.state = {key:this.props.idViaje}
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
    console.log("init key "+ this.props.key);
    console.log("init state "+ this.state.key);
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
                <CardActions disableSpacing style={{justifyContent: 'center'}}>
                        <Button variant="contained" size="medium" color="primary" onClick = {this.handleSubmit}>Cancelar</Button>
                </CardActions>
                </Card>
            </div>
      );
  }

  handleSubmit(e) {
    console.log(this.props.key);
  }
}

export default CardViajesAgendados;
