import React, { Component } from 'react';
import Navigation from '../../components/Navigation';
import Button from '@material-ui/core/Button';
import { storage } from './Firebase';
import { Box, LinearProgress, CircularProgress, Container, Typography } from '@material-ui/core';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import { API_ROOT } from '../../config/api-config';

class UploadImagenes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            urlCarnet: '',
            urlLicencia: '',
            urlSoat: '',
            progressCarnet: 0,
            progressLicConduccion: 0,
            progressSoat: 0,
            usuario: ''


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUploadCarnet = this.handleUploadCarnet.bind(this);
        this.handleUploadLicConduccion = this.handleUploadLicConduccion.bind(this);
        this.handleUploadSoat = this.handleUploadSoat.bind(this);
        this.handleFinalizar = this.handleFinalizar.bind(this);
    }

    handleChange(e) {
        if (e.target.files[0]) {
            this.setState({ image: e.target.files[0] });

        }
    };

    async handleFinalizar(e) {

        e.preventDefault();
        console.log(this.state);

        if (this.state.urlCarnet != '' && this.state.urlLicencia != '' && this.state.urlSoat != '') {
            alert("Los documentos se han subido satisfactoriamente");
            window.location.href = "/conductor";
        } else {
            alert("Adjunte los documentos que hacen falta ");
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


    handleUploadLicConduccion = () => {
        if (this.state.image === null) {
            alert("Por favor seleccione la imágen de su licencia de conducción ")
        } else {
            const uploadTask = storage.ref(`LicenciaConduccion/${this.state.image.name}`).put(this.state.image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({ progressLicConduccion: progress });
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("LicenciaConduccion")
                        .child(this.state.image.name)
                        .getDownloadURL()
                        .then(url => {
                            this.setState({ urlLicencia: url })
                            console.log(url)

                        });
                }
            );
        };

    }

    handleCancelar(e) {
        window.location.href = "/conductor";
    };

    handleUploadSoat = () => {
        if (this.state.image === null) {
            alert("Por favor seleccione la imágen del soat de su vehículo ")
        } else {
            const uploadTask = storage.ref(`Soat/${this.state.image.name}`).put(this.state.image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({ progressSoat: progress });
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("Soat")
                        .child(this.state.image.name)
                        .getDownloadURL()
                        .then(url => {
                            this.setState({ urlSoat: url })
                            console.log(url)

                        });
                }
            );
        };

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

                                <Box textAlign="center" fontWeight="fontWeightRegular">
                                    Por favor suba una imágen de su carné, de la institución educativa a la que pertenece
                                </Box>

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

                                <br />
                                <br />

                                <Box textAlign="center" fontWeight="fontWeightRegular">
                                    Por favor suba una imágen de su licencia de conducción
                                </Box>
                                <input

                                    id="upload-lic-conduccion"
                                    name="upload-lic-conduccion"
                                    type="file"
                                    onChange={this.handleChange}
                                />

                                <br />
                                <br />


                                <Button color="secondary" variant="contained" component="span" onClick={this.handleUploadLicConduccion}>
                                    Subir Licencia de Conducción
                                </Button>

                                <br />
                                <br />

                                <img src={this.state.urlLicencia || "http://via.placeholder.com/500x300"} width={500} height={300} />

                                <br />
                                <br />

                                <Container maxWidth="sm">
                                    <LinearProgress value={this.state.progressLicConduccion} variant="determinate" />
                                </Container>
                                <Box minWidth={35}>
                                    <Typography variant="body2" color="textSecondary">
                                        {`${Math.round(this.state.progressLicConduccion,)}%`}
                                    </Typography>
                                </Box>
                                <br />

                                <Box textAlign="center" fontWeight="fontWeightRegular">
                                    Por favor suba una imágen del soat de su vehiculo
                                </Box>
                                <input
                                    id="upload-soat"
                                    name="upload-soat"
                                    type="file"
                                    onChange={this.handleChange}
                                />

                                <br />
                                <br />

                                <Button color="secondary" variant="contained" component="span" onClick={this.handleUploadSoat}>
                                    Subir Soat del vehículo
                                </Button>

                                <br />
                                <br />

                                <img src={this.state.urlSoat || "http://via.placeholder.com/500x300"} width={500} height={300} />

                                <br />
                                <br />

                                <Container maxWidth="sm">
                                    <LinearProgress value={this.state.progressSoat} variant="determinate" />
                                </Container>
                                <Box minWidth={35}>
                                    <Typography variant="body2" color="textSecondary">
                                        {`${Math.round(this.state.progressSoat,)}%`}
                                    </Typography>
                                </Box>

                                <Button style={{ marginRight: 10 }} variant="contained" size="medium" color="secondary" component="span" onClick={this.handleCancelar} >Cancelar</Button>

                                <Button variant="contained" size="medium" color="primary" onClick={this.handleFinalizar} >Finalizar</Button>

                            </Form>
                        </Col>
                    </Row>


                </Container>
            </div>

        )
    };

}
export default UploadImagenes;