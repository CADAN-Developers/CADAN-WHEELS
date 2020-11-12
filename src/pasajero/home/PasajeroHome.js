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


class PasajeroHome extends React.Component {

    constructor(props) {
        super(props);
        this.alertClicked = this.alertClicked.bind(this);
        this.realizadoClick = this.realizadoClick.bind(this);
        this.state = {ofrecidos:[], completados:[], agendados:[], enCurso:[]};
    }

    componentDidMount(){
        const user = JSON.parse(localStorage.getItem("usuario"))
        fetch('http://localhost:8080/ViajesOfrecidos')
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
        fetch('https://cadanback.herokuapp.com/Realizados/' + user.correo)
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

        fetch('https://cadanback.herokuapp.com/AgenadosPas/' + user.correo)
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
        
        fetch('https://cadanback.herokuapp.com/EnCursoPas/' + user.correo)
                .then(response => response.json())
                .then(data => {
                    let enCursoP = [];
                    enCursoP.push({
                            "idViaje": data.idViaje, "pasajero": data.pasajero, "conductor": data.conductor, "ruta": data.ruta, "costo": data.costo, "calificacion": data.calificacion, "tipoViaje": data.tipoViaje, "fecha": moment(data.fecha), "cupos": data.cupos
                        })
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
            <ListGroup.Item key={viaje.idViaje}>{viaje.ruta} ${viaje.costo} conductor: {viaje.conductor}</ListGroup.Item>
            );
            
        });

        const user = JSON.parse(localStorage.getItem("usuario"))
        

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
                                        <Image src={user.foto} roundedCircle width="175" height="175" />
                                    </Card.Text>
                                    <Card.Title>{user.nombre}  {user.apellidos}  </Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{user.universidad} </ListGroup.Item>
                                        <ListGroup.Item>{user.telefono}</ListGroup.Item>
                                        <ListGroup.Item>{user.correo}</ListGroup.Item>
                                    </ListGroup>
                                        <Button variant="contained" size="medium" color="primary" component={Link} to="/p/actualizar" >Editar perfil</Button>
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
                                        <TextField id="outlined-basic" label="¿A donde quieres ir?" variant="outlined"/>
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

    realizadoClick(e){
        console.log("click" + Object.getOwnPropertyNames(e));
    }
}

export default PasajeroHome;