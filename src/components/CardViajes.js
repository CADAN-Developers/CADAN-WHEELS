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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CardViajes(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.rating);


  return (
      <div>
            <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" src={props.driver}>
                </Avatar>
                }
                title= {props.name}
                subheader= {props.date}
            />
            <CardMedia
                className={classes.media}
                image={props.map}
                title="Mapa"
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Description
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {props.description}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Cost
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {props.cost}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Qualify your Trip</Typography>
                    <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    />
                </Box>
            </CardActions>
            </Card>
        </div>
  );
}
