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
import { storage } from '../../components/imagenesDocumentos/Firebase';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import { API_ROOT } from '../../config/api-config';
import ListGroup from 'react-bootstrap/ListGroup'

class UpdatePasajero extends React.Component {
    constructor(props) {
        super(props);
        this.state = { image: null, urlCarnet: '', progressCarnet: 0, urlLicencia: '', urlSoat: '', usuario: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleUploadCarnet = this.handleUploadCarnet.bind(this);
        this.handleCancelar = this.handleCancelar.bind(this);
        this.handleFinalizar = this.handleFinalizar.bind(this);

    }

    render() {
        return (
            <div>
                {/* llamando navegacion de usuario (conductor) */}
                <Navigation tipoUsuario="Passenger" />
                <Container className="container-fluid">
                    <Row className="justify-content-md-center">
                        <AccountCircleIcon color="primary" style={{ fontSize: 80 }} />
                    </Row>
                    <Row className="justify-content-md-center">
                        <h1>Por favor sube tu carné para confirmar tu identidad dentro de tu comunidad educativa</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Text>
                                        <Image src={this.state.usuario.foto} roundedCircle width="175" height="175" />
                                    </Card.Text>
                                    <Card.Title>{this.state.usuario.nombre}  {this.state.usuario.apellidos}  </Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{this.state.usuario.universidad} </ListGroup.Item>
                                        <ListGroup.Item>{this.state.usuario.telefono}</ListGroup.Item>
                                        <ListGroup.Item>{this.state.usuario.correo}</ListGroup.Item>
                                    </ListGroup>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Form>

                                <input

                                    id="upload-carné"
                                    name="upload-carné"
                                    type="file"
                                    onChange={this.handleChange}
                                />

                                <br />
                                <br />
                                <Button color="secondary" variant="contained" component="span" onClick={this.handleUploadCarnet}>
                                    Subir Carné
                                </Button>

                                <br />
                                <br />

                                <img src={this.state.urlCarnet || "http://via.placeholder.com/500x300"} width={500} height={300} />

                                <br />
                                <br />
                                {/*<CircularProgress variant="static" value={this.state.progressCarnet} />*/}
                                <Container maxWidth="sm">
                                    <LinearProgress value={this.state.progressCarnet} variant="determinate" />
                                </Container>
                                <Box minWidth={35}>
                                    <Typography variant="body2" color="textSecondary">
                                        {`${Math.round(this.state.progressCarnet,)}%`}
                                    </Typography>
                                </Box>
                                
                                <Button style={{marginRight:10}} variant="contained" size="medium" color="secondary" component="span" onClick={this.handleCancelar} >Cancelar</Button>
                               
                                <Button variant="contained" size="medium" color="primary" onClick={this.handleFinalizar} >Finalizar</Button>
                            
                            </Form>
                        </Col>
                    </Row>


                </Container>
            </div>
        );
    }

    handleCancelar(e) {
        window.location.href = "/pasajero";
    };

    async handleFinalizar(e) {

        e.preventDefault();
        

        if (this.state.urlCarnet != '' ) {
            alert("Tu carné se ha subido satisfactoriamente");
            window.location.href = "/pasajero";
        } else {
            alert("Adjunta tu carné");
        }

        var user = sessionStorage.getItem("usuarioCompleto")
        user = JSON.parse(user)

        await axios.post(API_ROOT + '/imagenes/', {
            usuario: user.correo,
            urlCarnet: this.state.urlCarnet,
            urlLicenciaConduccion: this.state.urlLicencia,
            urlSoat: this.state.urlSoat,
            tipoUsuario: user.tipoUsuario

        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });



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

    handleChange(e) {
        if (e.target.files[0]) {
            this.setState({ image: e.target.files[0] });

        }
    };

    handleUploadCarnet = () => {
        if (this.state.image === null) {
            alert("Por favor seleccione la imágen de su carné")
        } else {
            const uploadTask = storage.ref(`carnés/${this.state.image.name}`).put(this.state.image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({ progressCarnet: progress });
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("carnés")
                        .child(this.state.image.name)
                        .getDownloadURL()
                        .then(url => {
                            this.setState({ urlCarnet: url })
                            console.log(url)

                        });
                }
            );
        };

    }
}

export default UpdatePasajero;