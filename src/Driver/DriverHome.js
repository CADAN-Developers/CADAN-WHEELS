import React, { Component } from "react";
import './DriverHome.css';


import Navigation from '../components/Navigation'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';



class DriverHome extends Component {

    render() {
        return (
            <div>
                {/* Navegation */}
                < Navigation title="Driver" />

                {/* Body */}
                <br></br>

                <Container fluid>
                    <Row>
                        <Col sm={2}>
                            <Card className="text-center">
                                <Card.Header bg="dark" as="h5">PANEL</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <Image src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg" roundedCircle width="175" height="175" />
                                    </Card.Text>
                                    <Card.Title>JULIAN SANCHEZ</Card.Title>

                                    <Button variant="primary">Add Car</Button>
                                    &nbsp;
                                    <Button variant="primary">Withdraw</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={10}>
                            <Card>
                                <Card.Header as="h5">Last Trips</Card.Header>
                                <Card.Body>

                                    <Row>
                                        <Col>
                                            {/* <!-- Card content --> */}
                                            <Card className="text-center">
                                                <Card.Header as="h5">
                                                    <Image src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg" roundedCircle width="200" height="200" />
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>MARIA GONZALEZ</Card.Title>
                                                    <Card.Text>
                                                        UNIVERSITARIO - 16 AGO 2020 - $3.000
                                            </Card.Text>
                                                    <Button variant="primary">Consult</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col>
                                            {/* <!-- Card content --> */}
                                            <Card className="text-center">
                                                <Card.Header as="h5">
                                                    <Image src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" roundedCircle width="200" height="200" />
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title> LAURA HERNANDEZ</Card.Title>
                                                    <Card.Text>
                                                        MAESTRO - 16 AGO 2020 - $4.000
                                            </Card.Text>
                                                    <Button variant="primary">Consult</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col>
                                            {/* <!-- Card content --> */}
                                            <Card className="text-center">
                                                <Card.Header as="h5">
                                                    <Image src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg" roundedCircle width="200" height="200" />
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>ALEJANDRO ALBA</Card.Title>
                                                    <Card.Text>
                                                        ESTUDIANTE - 15 AGO 2020 - $2.500
                                            </Card.Text>
                                                    <Button variant="primary">Consult</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col>
                                            {/* <!-- Card content --> */}
                                            <Card className="text-center">
                                                <Card.Header as="h5">
                                                    <Image src="https://mdbootstrap.com/img/Photos/Avatars/img%20(13).jpg" roundedCircle width="200" height="200" />
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Title>JORGE PAEZ</Card.Title>
                                                    <Card.Text>
                                                        MAESTRO - 12 AGO 2020 - $4.500
                                            </Card.Text>
                                                    <Button variant="primary">Consult</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card  >
                            <br></br>
                            <Card className="text-left">
                                <Card.Header as="h5">Latest Feedbacks</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col sm={1}>
                                            <Image src=" https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg" roundedCircle width="100" />
                                        </Col>
                                        <Col sm={10}>
                                            <Card.Title>MARIA GONZALEZ:</Card.Title>
                                            <Card.Text>
                                                With supporting text below as a natural lead-in to additional content.
                                            </Card.Text>
                                            <Button variant="outline-secondary">Comment</Button>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    <Row>
                                        <Col sm={1}>
                                            <Image src=" https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" roundedCircle width="100" />
                                        </Col>
                                        <Col sm={10}>
                                            <Card.Title>LAURA HERNANDEZ said:</Card.Title>
                                            <Card.Text>
                                                With supporting text below as a natural lead-in to additional content.
                                            </Card.Text>
                                            <Button variant="outline-secondary">Comment</Button>
                                        </Col>
                                    </Row>

                                    <br></br>
                                    <Row>
                                        <Col sm={1}>
                                            <Image src=" https://mdbootstrap.com/img/Photos/Avatars/img%20(13).jpg" roundedCircle width="100" />
                                        </Col>
                                        <Col sm={10}>
                                            <Card.Title>JORGE PAEZ said:</Card.Title>
                                            <Card.Text>
                                                With supporting text below as a natural lead-in to additional content.
                                            </Card.Text>
                                            <Button variant="outline-secondary">Comment</Button>
                                        </Col>
                                    </Row>

                                </Card.Body>
                            </Card>


                        </Col>
                    </Row>
                </Container>
                <br></br>
                <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
                    <div class="container text-center">
                        <small>Copyright &copy; CADAN WHEELS</small>
                    </div>
                </footer>
            </div>
        );
    }
}


export default DriverHome;