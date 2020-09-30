import React from "react";
// import MenuL from './MenuL'
import Navigation from "./Navigation"
// import { Button, Form, FormControl, ControlLabel } from "react-bootstrap/";
import { Button, Form } from "react-bootstrap/";
import "./Login.css";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            isLogged: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    handleChange(e) {
        var property = e.target.name
        this.setState({ [property]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("entra al boton");
        this.getUser(this.state.mail, this.state.password)
     //   alert("Datos incorrectos, favor verifique")
     //   console.log(this.state);
        this.setState({ mail: '', password: '' });

    }
    render() {
        return (
        <div>
        <Navigation tipoUsuario="None" />
        {/* <MenuL /> */}
        <container className="justify-content-md-center">
                    <div className="Login" >
                     <Form>
                    <Form.Group controlId="formBasicEmail">
                                <Form.Label>Correo</Form.Label>
                                <br/>
                                <input id="email"
                                    name="mail"
                                    type="email"
                                    placeholder="Enter email"
                                    className="form-control"
                                    outline icon="envelope"
                                    onChange={this.handleChange}
                                    value={this.state.mail}
                                />
                        <Form.Text className="text-muted">
                           correo con el que se registro en la plataforma
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <br />
                                <input id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <hr />
                            <Button className="form-control" variant="outline-success" type="submit" onClick={this.handleSubmit}>
                                Submit
                    </Button>
                            <br />
                            <br />
                            <Button className="form-control" variant="outline-dark" type="submit">
                                Quiero ser conducto
                    </Button>

                </Form>

                </div>
            </container>
         </div>
        )
    };

    getUser = ((mail, password) => {

        const data = new FormData();
        data.append('correo', mail);
        data.append('password', password);
        let url = "https://cadanback.herokuapp.com/logUser";
        const properties = this.props;
        console.log(properties)
        console.log("entra a la funcion");
        fetch(url, {
            method: 'POST',
            body: data
        }).then(function (response) {
            console.log(response);
            if (response.ok) {
                //window.location.href = "/options.html";
                return response.json();
            } else {
                alert("Ha ocurrido un error en el servidor");
                throw "Error en la llamada Ajax";
            }
        }).then(function (connect) {
            console.log(connect);
            if ((connect.isLog)) {
                alert("Inicio de sesion Exitoso");
                sessionStorage.setItem("usuario", mail);
                properties.handleClick(connect)
            } else {
                window.alert("verifique su correo/clave");
            }
        });
    })
    
}
export default Login