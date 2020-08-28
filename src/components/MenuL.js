import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

class MenuL extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">CADANWheels</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Conductores</Nav.Link>
                        <Nav.Link href="#features">Pasajeros</Nav.Link>
                        <Nav.Link href="#pricing">Acerca de</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button variant="outline-info">Registrarse</Button>
                    </Form>
                </Navbar>
            </div>
        );
    }
}

export default MenuL;