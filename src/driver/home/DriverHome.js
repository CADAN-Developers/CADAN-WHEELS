import React, { Component } from "react";



import Navigation from '../../components/Navigation'

import Card from 'react-bootstrap/Card';
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'
import TextField from '@material-ui/core/TextField';
// import InputGroup from 'react-bootstrap/InputGroup'
import moment from "moment";


class DriverHome extends Component {

    constructor(props) {
        super(props);
        //this.alertClicked = this.alertClicked.bind(this);
        //this.realizadoClick = this.realizadoClick.bind(this);
        this.state = {ofrecidos:[], completados:[], agendados:[], enCurso:[]};
    }


    componentDidMount(){
        const user = JSON.parse(localStorage.getItem("usuario"))

        fetch('http://localhost:8080/Ofrecidos/' + user.correo)
            .then(response => response.json())
            .then(data => {
                let ofrecidosC = [];
                data.forEach(function (viaje) {
                    ofrecidosC.push({
                        "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos
                    })
                });
                this.setState({ofrecidos:ofrecidosC});
            });
        fetch('http://localhost:8080/Completados/' + user.correo)
                .then(response => response.json())
                .then(data => {
                    let completadosP = [];
                    data.forEach(function (viaje) {
                        completadosP.push({
                            "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos
                        })
                    });
                    this.setState({completados:completadosP});
                });

        fetch('http://localhost:8080/AgenadosCon/' + user.correo)
                .then(response => response.json())
                .then(data => {
                    let AgendadosP = [];
                    data.forEach(function (viaje) {
                        AgendadosP.push({
                            "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos
                        })
                    });
                    this.setState({agendados:AgendadosP});
                });
        
        fetch('http://localhost:8080/EnCursoCon/' + user.correo)
                .then(response => response.json())
                .then(data => {
                    let enCursoP = [];
                    data.forEach(function (viaje) {
                    enCursoP.push({
                            "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos
                        })
                    });
                    this.setState({enCurso:enCursoP});
                })
                .catch(function(error) {
                });

                
            
    }

    render() {

        const completadosList = this.state.completados.map((viaje) => {
            return (
            <ListGroup.Item key={viaje.idViaje}> {viaje.ruta} ${viaje.costo} fecha: {viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')}</ListGroup.Item>
            );
        });
        const ofrecidosList = this.state.ofrecidos.map((viaje) => {
            return (
            <ListGroup.Item key={viaje.idViaje}>{viaje.ruta} ${viaje.costo}  cupos: {viaje.cupos}  fecha: {viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')}</ListGroup.Item>
            );
            
        });
        const agendadosList = this.state.agendados.map((viaje) => {
            return (
            <ListGroup.Item key={viaje.idViaje}> {viaje.ruta} ${viaje.costo} fecha: {viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')}</ListGroup.Item>
            );
        });

        const enCursoList = this.state.enCurso.map((viaje) => {
            return (
            <ListGroup.Item key={viaje.idViaje}>{viaje.ruta} ${viaje.costo} pasajero: {viaje.conductor}</ListGroup.Item>
            );
            
        });
        return (
            <div>
                {/* Navegation */}
                < Navigation tipoUsuario="Driver" />

                {/* Body */}
                <br></br>

                <Container fluid>
                    <Row>
                        <Col sm={4}>
                            <Card className="text-center">
                                <Card.Header bg="dark" as="h5">Usuario</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <Image src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg" roundedCircle width="175" height="175" />
                                    </Card.Text>
                                    <Card.Title>Carlos Paramo</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Universidad Javeriana</ListGroup.Item>
                                        <ListGroup.Item>929847382</ListGroup.Item>
                                        <ListGroup.Item>{sessionStorage.getItem("usuario")}</ListGroup.Item>
                                    </ListGroup>
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="" >Editar perfil</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col sm={8}>

                        <Card className="text-center">
                                <Card.Header as="h5">Viajes En Curso</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {enCursoList}
                                    </ListGroup>
                                </Card.Body>
                            </Card>    

                        <Card className="text-center">
                                <Card.Header as="h5">Viajes que Ofreces</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <TextField id="outlined-basic" label="¿A donde quieres ir?" variant="outlined"/>
                                        {ofrecidosList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            <Card className="text-center">
                                <Card.Header as="h5">Viajes Agendados</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {agendadosList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            
                            <Card className="text-center">
                                <Card.Header as="h5">Historial</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {completadosList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}


export default DriverHome;