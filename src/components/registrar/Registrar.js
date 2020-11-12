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

import Grid from '@material-ui/core/Grid';


import { Route, Redirect } from 'react-router-dom';


// Requerido para input de clave
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// formulario
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import Navigation from "../Navigation"
import Footer from "../footer/Footer"
import './Registrar.css';

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
    form: {
        '& > *': {
            margin: theme.spacing(1),

        },
    },
}));



export default function RegistrarTab() {
    const [isRegister, setIsRegister] = React.useState(false);


    const [url, setUrl] = React.useState("loginv2");

    const classes = useStyles();

    const [value, setValue] = React.useState('1');

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const [values, setValues] = React.useState({
        correo: '',
        clave: '',
        showPassword: false,
        tipoUsuario: '',
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        documento: '',
        universidad: '',
        carne: '',
        fotoCarne: ''
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

    // const [checked, setChecked] = React.useState(true);

    // const handleChangeChecked = (event) => {
    //     setChecked(event.target.checked);
    // };



    // peticiones
    function handleIniciar() {
        console.log(value);
        values.tipoUsuario = value === "1" ? 'pasajero' : 'conductor';
        console.log(values);
        let validado = true;
        // validar si los campos estan vacios
        for (let dato in values) {
            if (values[dato] === "") {
                validado = false;
                break;
            }
        }
        if (validado) {
            axios.post(API_ROOT + `/usuarios/`, values)
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                        toast.success('Te has registrado exitosament!');
                    } else {
                        toast.error("Correo ya registrado")
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            toast.error("Debe llenar todos los campos requeridos.")
        }

    }


    // Rregistrarse como pasajero
    const contenido =
        <form className={classes.form} noValidate autoComplete="off">

            {/* campo nombre */}
            <FormControl margin="normal" >
                <InputLabel htmlFor="nombre">Nombre</InputLabel>
                <Input
                    id="nombre"
                    value={values.nombre}
                    type='text'
                    onChange={handleChange('nombre')}
                />
            </FormControl>

            {/* campo apellido */}
            <FormControl margin="normal" >
                <InputLabel htmlFor="apellido">Apellido</InputLabel>
                <Input
                    id="apellido"
                    value={values.apellido}
                    type='text'
                    onChange={handleChange('apellido')}
                />
            </FormControl>

            {/* campo correo */}
            <FormControl margin="normal" >
                <InputLabel htmlFor="correo">Correo</InputLabel>
                <Input
                    id="correo"
                    value={values.correo}
                    type='text'
                    onChange={handleChange('correo')}
                />
                <FormHelperText id="subtext-correo">Correo institucional.</FormHelperText>
            </FormControl>

            {/* campo telefono */}
            <FormControl margin="normal" >
                <InputLabel htmlFor="telefono">Teléfono</InputLabel>
                <Input
                    id="telefono"
                    value={values.telefono}
                    type='number'
                    onChange={handleChange('telefono')}
                />
            </FormControl>

            {/* campo tipo documento */}
            <FormControl margin="normal" >
                <InputLabel htmlFor="tipoDocumento">Tipo Documento</InputLabel>
                <Input
                    id="tipoDocumento"
                    value={values.tipoDocumento}
                    type='text'
                    onChange={handleChange('tipoDocumento')}
                />
                <FormHelperText id="subtext-tipoDocumento">Cedula / tarjeta de Identidad / Pasaporte...</FormHelperText>
            </FormControl>

            {/* campo documento */}
            <FormControl margin="normal" >
                <InputLabel htmlFor="documento">Documento</InputLabel>
                <Input
                    id="documento"
                    value={values.documento}
                    type='text'
                    onChange={handleChange('documento')}
                />
            </FormControl>

            {/* campo universidad */}
            <FormControl margin="normal" >
                <InputLabel htmlFor="universidad">Universidad</InputLabel>
                <Input
                    id="universidad"
                    value={values.universidad}
                    type='text'
                    onChange={handleChange('universidad')}
                />
            </FormControl>

            {/* campo carne */}
            <FormControl margin="normal" >
                <InputLabel htmlFor="carne">Carné</InputLabel>
                <Input
                    id="carne"
                    value={values.carne}
                    type='text'
                    onChange={handleChange('carne')}
                />
            </FormControl>

            {/* campo foto carne */}
            <FormControl margin="normal" >
                <InputLabel htmlFor="fotoCarne">Adjuntar Carné</InputLabel>
                <Input
                    id="fotoCarne"
                    value={values.fotoCarne}
                    type='text'
                    onChange={handleChange('fotoCarne')}
                />
            </FormControl>

            {/* campo contraseña */}
            <FormControl margin="normal" >
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
            </FormControl>


        </form>

    return (
        <div className={classes.root}>
            <Navigation tipoUsuario="None" />
            <Grid alignContent="center" container spacing={0}>

                <Grid item xs>
                    <Container maxWidth="md" >
                        <br></br>
                        <div id="tabContent">

                            <TabContext value={value}>
                                <AppBar position="static">
                                    <TabList centered onChange={handleChangeTab} aria-label="simple tabs example">
                                        <Tab label="PASAJERO" value="1" />
                                        <Tab label="CONDUCTOR" value="2" />
                                    </TabList>
                                </AppBar>
                                <TabPanel value="1">
                                    {/* REGISTRARSE COMO PASAJERO */}
                                    <Chip
                                        icon={<FaceIcon />}
                                        label="Te vas a registrar como Pasajero"
                                        color="primary"
                                    />
                                    <hr></hr>
                                    {contenido}


                                </TabPanel>
                                <TabPanel value="2">
                                    {/* REGISTRARSE COMO CONDUCTOR */}
                                    <Chip
                                        icon={<FaceIcon />}
                                        label="Te vas a registrar como Conductor"
                                        color="secondary"
                                    />
                                    <hr></hr>
                                    {contenido}

                                </TabPanel>
                            </TabContext>

                            <Button fullWidth variant="contained" color="primary" onClick={handleIniciar}>Registrarse</Button>

                            {isRegister ?
                                <Route>
                                    <Redirect
                                        to={{
                                            pathname: "/" + url,
                                            search: "?cooreo=" + values.correo
                                        }}
                                    />

                                </Route>
                                :
                                null
                            }

                        </div>



                    </Container>
                </Grid>
            </Grid>

            <ToastContainer />
            <Footer />


        </div>
    );
}
