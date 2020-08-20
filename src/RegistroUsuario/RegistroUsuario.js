import React from 'react';
import Menu from './Menu';
import FormUsuario from './FormUsuario';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import logo from '../logo.svg';




class RegistroUsuario extends React.Component {
    render() {
        return (
            <div>
                <Menu></Menu>
                <Container>
                    <Row className="justify-content-md-center">
                        <h1>Registro de usuario</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={true} ><Image src={logo} rounded /></Col>
                        <Col lg={true} ><FormUsuario></FormUsuario></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default RegistroUsuario;