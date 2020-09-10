import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Navigation from '../../components/Navigation';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class UpdatePasajero extends React.Component {
    constructor() {
        super();
        this.state = {
            tipoUsuario: "Pasajero",
        };
        this.print=this.print.bind(this);
    }
    myChangeHandler = (event) => {
        this.setState({tipoUsuario: event.target.value});

    }
    print(){
        console.log(this.state.tipoUsuario);

    }

    render() {
        return (
            <div>
                {/* llamando navegacion de usuario (conductor) */}
                <Navigation tipoUsuario="Passenger" />

                <Container className="container-fluid">
                    <Row className="justify-content-md-center">
                        <AccountCircleIcon color = "primary" style={{ fontSize: 80 }}/>
                    </Row>
                    <Row className="justify-content-md-center">   
                        <h1>Registro de usuario</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Text>
                                        <Image src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg" roundedCircle width="175" height="175" />
                                    </Card.Text>
                                    <Button variant="primary">Edit</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre" />
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" placeholder="Apellido" />
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="integer" placeholder="Teléfono" />
                                    <Form.Label>Universidad</Form.Label>
                                    <Form.Control as="select">
                                        <option>Escuela Colombiana de Ingeniería Julio Garavito</option>
                                    </Form.Control>
                                    <Form.Label>Carné</Form.Label>
                                    <Form.Control type="integer" placeholder="Carné" />
                                </Form.Group>
                                <Form.File id="carne" label="Adjuntar carné" /> 
                            </Form>
                        </Col>
                    </Row>
                    <br/>
                    <Row className="justify-content-md-center"> 
                        <Button component={Link} to="/pasajero" >Actualizar</Button>
                    </Row>
                </Container>    
            </div>
        );
    }
}

export default UpdatePasajero;