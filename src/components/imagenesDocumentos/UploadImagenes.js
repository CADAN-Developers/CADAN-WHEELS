import React, { Component } from 'react';
import Navigation from '../../components/Navigation';
import Button from '@material-ui/core/Button';
import { storage } from './Firebase';
import { Box, LinearProgress, CircularProgress, Container, Typography } from '@material-ui/core';

class UploadImagenes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: '',
            progressCarnet: 0,
            progressLicConduccion: 0,
            progressSoat: 0


        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUploadCarnet = this.handleUploadCarnet.bind(this);
        this.handleUploadLicConduccion = this.handleUploadLicConduccion.bind(this);
        this.handleUploadSoat = this.handleUploadSoat.bind(this);
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
                            console.log(url)

                        });
                }
            );
        };

    }

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
                    this.setState({ progressLicSoat: progress });
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
                            console.log(url)

                        });
                }
            );
        };

    }



    render() {

        return (
            <div>
                <Navigation tipoUsuario="None" />
                
                    <div className="UploadImagenes" >

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

                        <Container maxWidth="sm">
                            <LinearProgress value={this.state.progressSoat} variant="determinate" />
                        </Container>
                        <Box minWidth={35}>
                            <Typography variant="body2" color="textSecondary">
                                {`${Math.round(this.state.progressSoat)}%`}
                            </Typography>
                        </Box>
                    </div>
               
            </div>
        )
    };

}
export default UploadImagenes;