import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Container from '@material-ui/core/Container';

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import { Route, Redirect } from 'react-router-dom';


// Requerido para input de clave
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// formulario
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import Navigation from "../Navigation";
import Footer from "../footer/Footer"
import './Login.css';

// peticiones con AXIOS
import axios from 'axios';

// alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// config
import { API_ROOT } from '../../config/api-config';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));



export default function LoginTab() {

    const classes = useStyles();

    const localUsuario = JSON.parse(localStorage.getItem('usuario'));

    const [isLoggedIn, setIsLoggedIn] = React.useState(localUsuario);
    
    const [usuarioExistente, setUsuarioExistente] =  React.useState(localUsuario);

    

    


    const [value, setValue] = React.useState('1');

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const [values, setValues] = React.useState({
        correo: '',
        clave: '',
        showPassword: false,
        tipoUsuario: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [checked, setChecked] = React.useState(true);

    const handleChangeChecked = (event) => {
        setChecked(event.target.checked);
    };



    // peticiones
    function handleIniciar() {
        console.log(value);
        values.tipoUsuario = value;
        console.log(values);
        if (values.correo !== "" && values.clave !== "") {
            axios.get(API_ROOT + `/usuarios/` + values.correo)
                .then(res => {
                    console.log(res.data);
                    let usuario = res.data;
                    if (usuario) {
                        let tipoUsuario = usuario.tipoUsuario === "pasajero" ? "1" : "2";
                        console.log(tipoUsuario);
                        // si el usuario existe
                        if (usuario.clave === values.clave) {
                            if (tipoUsuario === values.tipoUsuario) {
                                toast.success('Has iniciado sesión');
                                values.tipoUsuario = usuario.tipoUsuario;
                                setUsuarioExistente(usuario);
                                console.log(usuario)
                                setIsLoggedIn(true);
                                sessionStorage.setItem("usuarioCompleto", JSON.stringify(usuario));
                                localStorage.setItem('usuario',JSON.stringify(usuario));
                            } else {
                                toast.error("Correo o contraseña incorrectas")
                            }
                        }
                        else {
                            toast.error("Correo o contraseña incorrectas")
                        }
                    } else {
                        toast.error("Correo o contraseña incorrectas")
                    }
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Error en el servidor.")
                })
        } else {
            toast.error("Debe llenar todos los campos.")
        }

    }


    // iniciar sesion div
    const contenido = <div>
        <FormControl fullWidth margin="normal" >
            <InputLabel htmlFor="correo">Correo</InputLabel>
            <Input
                id="correo"
                aria-describedby="subtext-correo"
                value={values.correo}
                type='text'
                onChange={handleChange('correo')}
            />
            <FormHelperText id="subtext-correo">Correo con el que se registro en la plataforma.</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" >
            <InputLabel htmlFor="clave">Contraseña</InputLabel>
            <Input
                id="clave"
                type={values.showPassword ? 'text' : 'password'}
                value={values.clave}
                onChange={handleChange('clave')}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText id="subtext-clave">Ingrese su contraseña. <b>olvide mi contraseña.</b></FormHelperText>
        </FormControl>

        <Checkbox
            defaultChecked
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        /> Recordarme.

                        <hr></hr>


    </div>


    return (
        <div className={classes.root}>
            <Navigation tipoUsuario="None" />

            <Container id="container-full" maxWidth="xs">
                <br></br>
                <div id="tabContent" >

                    <TabContext value={value}>
                        <AppBar position="static">
                            <TabList centered onChange={handleChangeTab} aria-label="simple tabs example">
                                <Tab label="PASAJERO" value="1" />
                                <Tab label="CONDUCTOR" value="2" />
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            {/* INICIAR SESION PASAJERO */}
                            <Chip
                                icon={<FaceIcon />}
                                label="Iniciar sesión como Pasajero"
                                color="primary"
                            />
                            <hr></hr>
                            {contenido}


                        </TabPanel>
                        <TabPanel value="2">
                            {/* INICIAR SESION CONDUCTOR */}
                            <Chip
                                icon={<FaceIcon />}
                                label="Iniciar sesión como Conductor"
                                color="secondary"
                            />
                            <hr></hr>
                            {contenido}

                        </TabPanel>
                    </TabContext>

                    <Button variant="contained" color="primary" onClick={handleIniciar}>Ingresar</Button>
                    &nbsp;&nbsp;
                    <Button variant="contained" href="registrarv2">Registrarse</Button>
                    <br></br>
                    {isLoggedIn ?
                        <Route>
                            <Redirect
                                to={{
                                    pathname: "/" + usuarioExistente.tipoUsuario,
                                    search: "?tipoUsuario=" + values.tipoUsuario,
                                    state: { referrer: "currentLocation" }
                                }}
                            />

                        </Route>
                        :
                        null
                    }

                </div>
            </Container>
            <ToastContainer />
            <Footer />
        </div>
    );
}