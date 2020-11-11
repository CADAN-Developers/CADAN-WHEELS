import React from 'react';
import moment from "moment";
import Navigation from '../../components/Navigation'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { TodoListVehic } from "./TodoListVehic";
import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';


export default class FormVehiculo extends React.Component {
    constructor(props) {
        super(props)
        this.state = { vehiculos: [], marca: '', matricula: moment(), placa: '', capacidad: '', soat: moment(), open: false };
        this.handleMarcaChange = this.handleMarcaChange.bind(this);
        this.handleMatriculaDateChange = this.handleMatriculaDateChange.bind(this);
        this.handlePlacaChange = this.handlePlacaChange.bind(this);
        this.handleCapacidadChange = this.handleCapacidadChange.bind(this);
        this.handleSoatDateChange = this.handleSoatDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

    }

    render() {
        return (
            <div >

                < Navigation tipoUsuario="Driver" />
                <h1>Tus Vehículos</h1>
                
                <Fab onClick={this.handleOpen} color="primary" style={{ position: "absolute", right: "0px", bottom: "0", margin: "10px" }}>
                    <AddIcon></AddIcon>
                </Fab>

                <Dialog className="App" onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <form onSubmit={this.handleSubmit} className="todo-form" style={{ width: "100%" }}>
                        <h3>Nuevo Vehículo</h3>
                        <InputLabel id="marca">Marca</InputLabel>
                        <Select
                            id="marca"
                            value={this.state.marca}
                            onChange={this.handleMarcaChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Renault"}>Renault</MenuItem>
                            <MenuItem value={"Mazda"}>Mazda</MenuItem>
                            <MenuItem value={"Ford"}>Ford</MenuItem>
                            <MenuItem value={"Chevrolet"}>Chevrolet</MenuItem>
                            <MenuItem value={"Nissan"}>Nissan</MenuItem>
                            <MenuItem value={"Kia"}>Kia</MenuItem>
                        </Select>

                        <br />
                        <TextField
                            id="matricula"
                            label="Fecha de Matricula"
                            type="date"
                            defaultValue={this.state.matricula.format('YYYY-MM-DD')}
                            onChange={this.handleMatriculaDateChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <br />
                        <TextField
                            id="placa"
                            label="Placa del vehículo"
                            value={this.state.placa}
                            onChange={this.handlePlacaChange}
                            margin="normal" />
                        <br />
                        <InputLabel id="capacidad">Capacidad</InputLabel>
                        <Select
                            id="capacidad"
                            value={this.state.capacidad}
                            onChange={this.handleCapacidadChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"5"}>5</MenuItem>
                            <MenuItem value={"7"}>7</MenuItem>
                        </Select>
                        <br />
                        <TextField
                            id="soat"
                            label="soat"
                            type="date"
                            defaultValue={this.state.soat.format('YYYY-MM-DD')}
                            onChange={this.handleSoatDateChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <br />
                        <Button variant="contained" color="primary" type="submit">
                            Añadir Vehículo #{this.state.vehiculos.length + 1}
                        </Button>
                    </form>
                </Dialog>
                <TodoListVehic vehicList={this.state.vehiculos} />
            </div >
        );

    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleMarcaChange(e) {
        this.setState({
            marca: e.target.value
        });
    }

    handleMatriculaDateChange(e) {
        this.setState({
            matricula: moment(e.target.value, 'YYYY-MM-DD')
        });
    }

    handlePlacaChange(e) {
        console.log(e)
        this.setState({
            placa: e.target.value
        });
    }

    

    handleCapacidadChange(e) {
        this.setState({ 
            capacidad: e.target.value 
        });
    }

    handleSoatDateChange(e) {
        this.setState({
            soat: moment(e.target.value, 'YYYY-MM-DD')
        });
    }

    async handleSubmit(e) {

        e.preventDefault();
        console.log(this.state);

        if (!this.state.marca || !this.state.matricula || !this.state.placa || !this.state.capacidad || !this.state.soat )
            return;

        const newVehic = {
            correoDueño: "daniel@mail.com",
            placa: this.state.placa,
            marca: this.state.marca,
            color: "Negro",
            matricula: this.state.matricula,
            capacidad: this.state.capacidad,
            fechaSoat: this.state.matricula,
            soat: "soat"
        };
        this.setState(prevState => ({
            vehiculos: prevState.vehiculos.concat(newVehic),
            marca: '',
            matricula: moment(),
            placa: '',
            capacidad: '',
            soat: moment(),
            open: false
        }));

        await axios.post('https://cadanback.herokuapp.com/AddVehiculo', {
            correoDueño: "daniel@mail.com",
            placa: this.state.placa,
            marca: this.state.marca,
            color: "Negro",
            matricula: this.state.matricula,
            capacidad: this.state.capacidad,
            fechaSoat: this.state.matricula,
            soat: "soat"
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    componentDidMount() {
        this.setState(prevState => ({
            vehiculos: prevState.vehiculos.concat(this.props.vehicList)
        }))
    }

}