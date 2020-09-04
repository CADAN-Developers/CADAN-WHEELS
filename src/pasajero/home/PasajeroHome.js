import React from 'react';

import Navigation from '../../components/Navigation'

// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup'
// import InputGroup from 'react-bootstrap/InputGroup'


class PasajeroHome extends React.Component {

    constructor(props) {
        super(props);
        this.alertClicked = this.alertClicked.bind(this);
    }

    render() {
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
                    </Navbar> */}
                <Container fluid>
                    <Row>
                        <Col sm={4}>
                            <Card className="text-center">
                                <Card.Header bg="dark" as="h5">PANEL</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <Image src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg" roundedCircle width="175" height="175" />
                                    </Card.Text>
                                    <Card.Title>CARLOS PARAMO</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Universidad Javeriana</ListGroup.Item>
                                        <ListGroup.Item>929847382</ListGroup.Item>
                                        <ListGroup.Item>c.paramo@gmail.com</ListGroup.Item>
                                    </ListGroup>
                                    <Button variant="primary">Edit</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col sm={8}>
                            <Card className="text-center">
                                <Card.Header as="h5">Records</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item action onClick={this.alertClicked}>Cra 15 #45-12 a U. Andes $10.000</ListGroup.Item>
                                        <ListGroup.Item action onClick={this.alertClicked}>Cra 100 #64-15 a U. Piloto $6.000</ListGroup.Item>
                                        <ListGroup.Item action onClick={this.alertClicked}>Cra 87 #54-02 a U. Javeriana $8.000</ListGroup.Item>
                                        <ListGroup.Item action onClick={this.alertClicked}>Cra 78 #15-80 a U. Tadeo $5.000</ListGroup.Item>
                                        <ListGroup.Item action onClick={this.alertClicked}>Cra 53 #32-33 a U. ECCI $6.000</ListGroup.Item>
                                        <ListGroup.Item action onClick={this.alertClicked}>Cra 12 #69-20 a U. ECI $7.000</ListGroup.Item>
                                        <ListGroup.Item action onClick={this.alertClicked}>Cra 20 #65-14 a U. Sergio Arboleda $8.000</ListGroup.Item>
                                        <ListGroup.Item action onClick={this.alertClicked}>See more</ListGroup.Item>
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
}

export default PasajeroHome;