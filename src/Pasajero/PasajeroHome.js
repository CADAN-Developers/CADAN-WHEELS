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
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#profile">Profile</Nav.Link>
                        <Nav.Link href="#history">Record</Nav.Link>
                        <Button variant="danger">Log Out</Button>
                    </Nav>
                </Navbar>
        );
    }
}

export default PasajeroHome;