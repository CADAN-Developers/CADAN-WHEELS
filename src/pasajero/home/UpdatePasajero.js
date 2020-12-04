import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container'
import Navigation from '../../components/Navigation';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from '../../config/api-config';

class UpdatePasajero extends React.Component {
    constructor() {
        super();
        this.state ={usuario: '', contraseña: '', telefono:'', universidad:''};
        this.handleContraseñaChange = this.handleContraseñaChange.bind(this);
        this.handleTelefonoChange = this.handleTelefonoChange.bind(this);
        this.handleUniversidadChange = this.handleUniversidadChange.bind(this);
        

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
                        <h1>Actualiza tus datos</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Text>
                                        <Image src={this.state.usuario.foto} roundedCircle width="175" height="175" />
                                    </Card.Text>
                                    {/*<Button variant="contained" size="medium" color="primary">Editar Foto</Button>*/}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Nueva Contraseña" value={this.state.contraseña} onChange={this.handleContraseñaChange}/>
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="integer" placeholder="Teléfono" value={this.state.telefono} onChange={this.handleTelefonoChange} />
                                    <Form.Label>Universidad</Form.Label>
                                    <Form.Control as="select" value={this.state.universidad} onChange={this.handleUniversidadChange}>
                                        <option>Escuela Colombiana de Ingeniería Julio Garavito</option>
                                        <option>La Javeriana mijo</option>
                                        <option>Universidad del Bosque</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <br/>
                        <Row className="justify-content-md-center"> 
                            <Button style={{ marginRight: 10 }} variant="contained" size="medium" color="secondary" component="span" onClick={this.handleCancelar} >Cancelar</Button>
                            <Button variant="contained" size="medium" color="primary" onClick={this.handleFinalizar} >Actualizar</Button>
                        </Row>
                </Container>  
            </div>
        );
    }

    

    componentDidMount(e) {
        // obtener datos usuario
        axios.get(API_ROOT + `/usuarios/` + sessionStorage.getItem("usuario"))
            .then(res => {
                let us = res.data;
                console.log("data");
                console.log(us);

                if (us) {

                    this.setState({ usuario: us });

                }
            })
            .catch((err) => {
                console.log(err)

            })
    }


    handleCancelar(e) {
        window.location.href = "/pasajero";
    };

    handleContraseñaChange(e) {
        this.setState({ 
            contraseña: e.target.value 
        });
    }

    handleTelefonoChange(e) {
        this.setState({ 
            telefono: e.target.value 
        });
    }

    handleUniversidadChange(e) {
        this.setState({ 
            universidad: e.target.value 
        });
    }

    async handleFinalizar(e) {

        e.preventDefault();
        //console.log(this.state);

        if (this.state.universidad != '' || this.state.telefono != '' || this.state.contraseña != '') {
            alert("Se han actualizado los datos correctamente");
            window.location.href = "/conductor";
        } else {
            alert("Actualice al menos un campo ");
        }

        var user = sessionStorage.getItem("usuarioCompleto")
        user = JSON.parse(user)
        if(this.state.universidad === ''){
            this.setState.universidad( {universidad:user.universidad})
        }if(this.state.telefono === ''){
            this.setState.telefono( {telefono:user.telefono})
        }if(this.state.contraseña === ''){
            this.setState.contraseña( {contraseña:user.contraseña})
        }
        await axios.post(API_ROOT + '/usuarios/', {
            nombre:user.nombre,
            apellidos:user.apellidos,
            clave:this.state.contraseña,
            correo: user.correo,
            telefono: this.state.telefono,
            tipoDocumento: user.tipoDocumento,
            documento: user.documento,
            universidad: this.state.universidad,
            tipoUsuario:user.tipoUsuario,
            carne:user.carne

        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}



export default UpdatePasajero;