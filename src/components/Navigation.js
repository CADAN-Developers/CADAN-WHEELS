import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

//ICONOS REACT
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/Info';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PersonIcon from '@material-ui/icons/Person';

import "./Navigation.css"

const useStyles = makeStyles((theme) => ({
    list: {
        width: 320,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function handleLogout() {
    console.log("Entro a cerrar sesion");
    if (localStorage.isLoggedIn) {
        localStorage.clear();
        window.location.replace("/")

    } else {
        console.log("Sin iniciar");
    }

};


export default function TemporaryDrawer({ tipoUsuario }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    // CUANDO EL USUARIO ES CONDUCTOR
    const navDriver = <div>
        <List>
            <ListItem button>
                <ListItemAvatar className="avatar_menu">
                    <Avatar
                        alt="AVATAR"
                        src="https://material-ui.com/static/images/avatar/1.jpg?size=70x70"
                        size="70"
                        style={{
                            width: "70px",
                            height: "70px"
                        }}
                    />
                </ListItemAvatar>
                <ListItemText primary="JULIAN SANCHEZ" secondary={

                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            <b>julian@escuela.co</b> - {tipoUsuario}
                        </Typography>
                        <br></br>

                        <br></br>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button component={Link} to="/dprofile">Profile</Button>
                            <Button component={Link} to="/dwithdraw">Withdraw</Button>
                        </ButtonGroup>

                    </React.Fragment>
                }
                />

            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button component={Link} to="/driver">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/registerVehic">
                <ListItemIcon><DriveEtaIcon /></ListItemIcon>
                <ListItemText primary="Add Car" />
            </ListItem>
            <ListItem button component={Link} to="/statistics">
                <ListItemIcon><EqualizerIcon /></ListItemIcon>
                <ListItemText primary="Statistics" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={handleLogout.bind(this)}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    </div>

    // CUANDO EL USUARIO ES PASAJERO
    const navPassenger = <div>
        <List>
            <ListItem button>
                <ListItemAvatar className="avatar_menu">
                    <Avatar
                        alt="AVATAR"
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg?size=70x70"
                        size="70"
                        style={{
                            width: "70px",
                            height: "70px"
                        }}
                    />
                </ListItemAvatar>
                <ListItemText primary="CARLOS PARAMO" secondary={

                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            <b>c.paramo@gmail.com</b> - {tipoUsuario}
                        </Typography>
                        <br></br>

                        <br></br>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button component={Link} to="/UpdatePasajero">Profile</Button>
                        </ButtonGroup>

                    </React.Fragment>
                }
                />

            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button component={Link} to="/pasajero">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/RecordsPasajero">
                <ListItemIcon><DriveEtaIcon /></ListItemIcon>
                <ListItemText primary="Record" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={handleLogout.bind(this)}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    </div>

    // CUANDO NO EXISTE USUARIO
    const navNone = <div>
        <List>
            <ListItem button component={Link} to="/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/registerUsuario">
                <ListItemIcon><PermIdentityIcon /></ListItemIcon>
                <ListItemText primary="Passenger" />
            </ListItem>
            <ListItem button component={Link} to="/login">
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Driver" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button component={Link} to="/aboutus">
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="About Us" />
            </ListItem>
        </List>
    </div>;

    // Verificar que usuario es y guardando su menu 
    let selectMenu;
    if (tipoUsuario === "Driver") {
        selectMenu = navDriver;
    } else if (tipoUsuario === "Passenger") {
        selectMenu = navPassenger;
    } else {
        selectMenu = navNone;
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {/* Mostrando el menu correspondiente */}
            {selectMenu}

        </div >
    );



    let buttons;
    buttons = <div>
        <Button color="inherit" onClick={toggleDrawer("right", true)}><MenuIcon color="inherit" /></Button>
        <Drawer anchor="right" open={state["right"]} onClose={toggleDrawer("right", false)}>
            {list("right")}
        </Drawer>
    </div>;
    // if (localStorage.isLoggedIn) {
    //     buttons = <div>
    //         <Button color="inherit" onClick={toggleDrawer("right", true)}><MenuIcon color="inherit" /></Button>
    //         <Drawer anchor="right" open={state["right"]} onClose={toggleDrawer("right", false)}>
    //             {list("right")}
    //         </Drawer>
    //     </div>;
    // } else {
    //     buttons = <Button component={Link} to="/login" color="inherit">Login</Button>
    // }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.menuButton}>
                        CADAN WHEELS
                    </Typography>

                    <div className={classes.title}></div>

                    {buttons}
                </Toolbar>
            </AppBar>

        </div>
    );


}