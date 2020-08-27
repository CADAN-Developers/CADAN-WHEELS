import React, { Component } from "react";

import Navbar from 'react-bootstrap/Navbar';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

class Navigation extends Component {
    render() {
        return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">CADAN WHEELS - {this.props.title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#profile">Profile</Nav.Link>
                        <Nav.Link href="#addcar">Add Car</Nav.Link>
                        <Nav.Link href="#statistics">Statistics</Nav.Link>
                        <Button href="#logout" variant="danger">Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}

export default Navigation;