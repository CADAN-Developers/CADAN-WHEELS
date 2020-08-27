import React from "react";
import Navigation from "./Navigation"
import { Button, Form, FormControl, ControlLabel } from "react-bootstrap/";
import "./Login.css";

class Login extends React.Component {

    render() {
        return (
        <div>
        <Navigation />
        <div className="Login">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                       correo con el que se registro en la plataforma
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="outline-success" type="submit">
                    Submit
  </Button>
            </Form>
                </div>
            </div>
    )};
}
export default Login