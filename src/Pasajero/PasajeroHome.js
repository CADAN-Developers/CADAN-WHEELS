import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';


import Button from 'react-bootstrap/Button';

class PasajeroHome extends React.Component {
    render() {
        return (
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">CADANWheels</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Incio</Nav.Link>
                        <Nav.Link href="#profile">Perfil</Nav.Link>
                        <Nav.Link href="#history">Historial</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button variant="outline-info">Cerrar Sesión</Button>
                    </Form>
                </Navbar>
        );
    }
}

export default PasajeroHome;