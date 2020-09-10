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
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        var property = e.target.name
        this.setState({ [property]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("entra al boton");       
        alert("Datos incorrectos, favor verifique")
        console.log(this.state);
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
    )};
}
export default Login