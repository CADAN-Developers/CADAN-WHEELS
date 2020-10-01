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
    this.state = {value:3}
    this.handleRateChange = this.handleRateChange.bind(this);
  }

  render(){
      return (
          <div>
                <Card style={{maxWidth: 345}}>
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
                        Description
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {this.props.description}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Cost
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {this.props.cost}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Qualify your Trip</Typography>
                        <Rating
                        name="read-only"
                        defaultValue={this.props.rating}
                        precision={0.5}
                        readOnly 
                        onChange={this.handleRateChange}
                        />
                    </Box>
                </CardActions>
                </Card>
            </div>
      );
  }

  handleRateChange(e) {
    console.log(e.target.value);
    this.setState({
        value: e.target.value
    });
  }
}

export default CardViajes;
