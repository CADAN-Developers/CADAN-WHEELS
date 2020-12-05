import React, { Component } from "react";



import Navigation from '../../components/Navigation'
import Footer from '../../components/footer/Footer'


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



// peticiones con AXIOS
import axios from 'axios';

// config
import { API_ROOT } from '../../config/api-config';

// alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class DriverHome extends Component {

    constructor(props) {
        super(props);
        //this.alertClicked = this.alertClicked.bind(this);
        //this.realizadoClick = this.realizadoClick.bind(this);
        this.state = {
            ofrecidos: [], completados: [], agendados: [], enCurso: [], usuario: ''
        };
    }


    componentDidMount() {
        fetch(API_ROOT + '/Ofrecidos/' + sessionStorage.getItem("usuario"))

            .then(response => response.json())
            .then(data => {
                let ofrecidosC = [];
                data.forEach(function (viaje) {
                    ofrecidosC.push({
                        "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos, "mapa": viaje.mapa, "ofrecido": viaje.ofrecido
                    })
                });
                this.setState({ ofrecidos: ofrecidosC });
            });
            
        fetch(API_ROOT + '/Completados/' + sessionStorage.getItem("usuario"))
            .then(response => response.json())
            .then(data => {
                let completadosP = [];
                data.forEach(function (viaje) {
                    completadosP.push({
                        "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos, "mapa": viaje.mapa, "ofrecido": viaje.ofrecido
                    })
                });
                this.setState({ completados: completadosP });
            });

            
        fetch(API_ROOT + '/AgenadosCon/' + sessionStorage.getItem("usuario"))
            .then(response => response.json())
            .then(data => {
                let AgendadosP = [];
                data.forEach(function (viaje) {
                    AgendadosP.push({
                        "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos, "mapa": viaje.mapa, "ofrecido": viaje.ofrecido
                    })
                });
                this.setState({ agendados: AgendadosP });
            });

        fetch(API_ROOT + '/EnCursoCon/' + sessionStorage.getItem("usuario"))
            .then(response => response.json())
            .then(data => {
                let enCursoP = [];
                data.forEach(function (viaje) {

                    enCursoP.push({
                        "idViaje": viaje.idViaje, "pasajero": viaje.pasajero, "conductor": viaje.conductor, "ruta": viaje.ruta, "costo": viaje.costo, "calificacion": viaje.calificacion, "tipoViaje": viaje.tipoViaje, "fecha": moment(viaje.fecha), "cupos": viaje.cupos, "mapa": viaje.mapa, "ofrecido": viaje.ofrecido
                    })
                });
                this.setState({ enCurso: enCursoP });
            })
            .catch(function (error) {
            });

        // obtener datos usuario
        axios.get(API_ROOT + `/usuarios/` + sessionStorage.getItem("usuario"))
            .then(res => {
                let us = res.data;
                console.log("data");
                console.log(us);

                if (us) {

                    this.setState({ usuario: us });
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error("Error en el servidor.")
            })



    }

    render() {


        const completadosList = this.state.completados.map((viaje) => {
            return (
                <ListGroup.Item key={viaje.idViaje}> {viaje.ruta} ${viaje.costo} fecha: {viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')} calificacion: {viaje.calificacion}</ListGroup.Item>
            );
        });
        const ofrecidosList = this.state.ofrecidos.map((viaje) => {
            return (
                <ListGroup.Item key={viaje.idViaje}>{viaje.ruta} ${viaje.costo}  cupos: {viaje.cupos}  fecha: {viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')}</ListGroup.Item>
            );

        });
        const agendadosList = this.state.agendados.map((viaje) => {
            return (
                <ListGroup.Item key={viaje.idViaje}> {viaje.ruta} pasajero: {viaje.pasajero} ${viaje.costo} fecha: {viaje.fecha.format('DD-MM-YYYY, h:mm:ss a')}</ListGroup.Item>
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
                                        <Image src={this.state.usuario.foto} roundedCircle width="175" height="175" />
                                    </Card.Text>
                                    <Card.Title>{ this.state.usuario.nombre + ' ' + this.state.usuario.apellidos }</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{this.state.usuario.universidad}</ListGroup.Item>
                                        <ListGroup.Item>{this.state.usuario.tipoDocumento + ': ' + this.state.usuario.documento}</ListGroup.Item>
                                        <ListGroup.Item>{this.state.usuario.correo}</ListGroup.Item>
                                    </ListGroup>
                                    <Button variant="contained" size="medium" color="primary" component={Link} to="" >Editar perfil</Button>
                                    <br />
                                    <br />
                                    <Button variant="contained" size="medium" color="primary" component={Link} to="/c/subirDocumentos" >Subir Documentos</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col sm={8}>

                            <Card className="text-center">
                                <Card.Header as="h5">Viajes En Curso</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {enCursoList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="/c/enCurso" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                            <Card className="text-center">
                                <Card.Header as="h5">Viajes que Ofreces</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {ofrecidosList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="/c/ofrecidos" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            <Card className="text-center">
                                <Card.Header as="h5">Viajes Agendados</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {agendadosList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="/c/agendados" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                            <Card className="text-center">
                                <Card.Header as="h5">Historial</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {completadosList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="/c/registros" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <br></br>
                <ToastContainer />
                <Footer />
            </div>

        );
    }
}


export default DriverHome;