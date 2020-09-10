import React from 'react';
import Navigation from '../../components/Navigation'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import logo from '../../logo.svg';

import FormVehiculo from './FormVehiculo';

export default class RegistroVehiculo extends React.Component {
    render() {
        return (
            <div >
                {/* llamando navegacion de usuario (conductor) */}
                <Navigation tipoUsuario="Driver"/>
                <Container className="container-fluid">
                    <Row className="justify-content-md-center">
                        <h1>Registro de vehículo</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={true} ><Image src={logo} rounded /></Col>
                        <Col lg={true} ><FormVehiculo /></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
