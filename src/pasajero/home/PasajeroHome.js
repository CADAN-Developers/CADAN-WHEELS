import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation'

// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup'
import TextField from '@material-ui/core/TextField';
// import InputGroup from 'react-bootstrap/InputGroup'
import moment from "moment";

// config
import { API_ROOT } from '../../config/api-config';

// peticiones con AXIOS
import axios from 'axios';

// alertas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class PasajeroHome extends React.Component {

    constructor(props) {
        super(props);
        this.alertClicked = this.alertClicked.bind(this);
        this.realizadoClick = this.realizadoClick.bind(this);
        this.state = { ofrecidos: [], completados: [], agendados: [], enCurso: [], usuario: '' };
    }

    
    componentDidMount() {
        fetch(API_ROOT + '/ViajesOfrecidos/'  + sessionStorage.getItem("usuario"))
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
            
        fetch(API_ROOT + '/Realizados/' + sessionStorage.getItem("usuario"))
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

            
        fetch(API_ROOT + '/AgenadosPas/' + sessionStorage.getItem("usuario"))
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

        fetch(API_ROOT + '/EnCursoPas/' + sessionStorage.getItem("usuario"))
            .then(response => response.json())
            .then(data => {
                let enCursoP = [];
                enCursoP.push({
                    "idViaje": data.idViaje, "pasajero": data.pasajero, "conductor": data.conductor, "ruta": data.ruta, "costo": data.costo, "calificacion": data.calificacion, "tipoViaje": data.tipoViaje, "fecha": moment(data.fecha), "cupos": data.cupos, "mapa": data.mapa, "ofrecido": data.ofrecido
                })
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
                <ListGroup.Item key={viaje.idViaje}>{viaje.ruta} ${viaje.costo} conductor: {viaje.conductor}</ListGroup.Item>
            );

        });

        // const user = JSON.parse(sessionStorage.getItem("usuarioCompleto"))

        return (

            <div>
                {/* llamando navegacion de usuario (conductor) */}
                <Navigation tipoUsuario="Passenger" />

                {/* <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">CADANWheels</Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#profile">Profile</Nav.Link>
                            <Nav.Link href="#history">Record</Nav.Link>
                            <Button variant="danger">Log Out</Button>
                        </Nav>
                    </Navbar> 
                     <ListGroup.Item >Cra 15 #45-12 a U. Andes $10.000</ListGroup.Item>
                                        <ListGroup.Item >Cra 100 #64-15 a U. Javeriana $8.000</ListGroup.Item>
                                        <ListGroup.Item >Cra 87 #54-02 a U. Piloto $6.000</ListGroup.Item>
                                        <ListGroup.Item >Cra 78 #15-80 a U. Tadeo $5.000</ListGroup.Item>
                                        <ListGroup.Item >Cra 53 #32-33 a U. ECCI $6.000</ListGroup.Item>
                                        <ListGroup.Item >Cra 12 #69-20 a U. ECI $7.000</ListGroup.Item>
                                        <ListGroup.Item >Cra 20 #65-14 a U. Sergio Arboleda $8.000</ListGroup.Item>*/}
                <Container fluid>
                    <Row>
                        <Col sm={4}>
                            <Card className="text-center">
                                <Card.Header bg="dark" as="h5">Usuario</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <Image src={this.state.usuario.foto} roundedCircle width="175" height="175" />
                                    </Card.Text>
                                    <Card.Title>{this.state.usuario.nombre}  {this.state.usuario.apellidos}  </Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{this.state.usuario.universidad} </ListGroup.Item>
                                        <ListGroup.Item>{this.state.usuario.telefono}</ListGroup.Item>
                                        <ListGroup.Item>{this.state.usuario.correo}</ListGroup.Item>
                                    </ListGroup>
                                    <Button variant="contained" size="medium" color="primary" component={Link} to="/p/actualizar" >Editar perfil</Button>
                                    <br />
                                    <br />
                                    <Button variant="contained" size="medium" color="primary" component={Link} to="/p/subirCarnet" >Subir Documento</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col sm={8}>

                            <Card className="text-center">
                                <Card.Header as="h5">Viaje En Curso</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {enCursoList}
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                            <Card className="text-center">
                                <Card.Header as="h5">Viajes Disponibles</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <TextField id="outlined-basic" label="¿A donde quieres ir?" variant="outlined" />
                                        {ofrecidosList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="/p/ofrecidos" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            <Card className="text-center">
                                <Card.Header as="h5">Viajes Agendados</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {agendadosList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="/p/agendados" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>

                            <Card className="text-center">
                                <Card.Header as="h5">Historial</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        {completadosList}
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="/p/registros" >Ver Todos</Button>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }

    alertClicked() {
        alert('Operation in maintenance');
    }

    realizadoClick(e) {
        console.log("click" + Object.getOwnPropertyNames(e));
    }
}

export default PasajeroHome;