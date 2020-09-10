import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



class FormUsuario extends React.Component {
    constructor() {
        super();
        this.state = {
            tipoUsuario: "Pasajero",
        };
        this.print=this.print.bind(this);
    }
    myChangeHandler = (event) => {
        this.setState({tipoUsuario: event.target.value});

    }
    print(){
        console.log(this.state.tipoUsuario);

    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre" />
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" placeholder="Apellido" />
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="integer" placeholder="Teléfono" />
                        <Form.Label>Tipo de documento</Form.Label>
                        <Form.Control as="select">
                            <option>Cedula</option>
                            <option>Pasaporte</option>
                            <option>Cedula de extranjería</option>
                        </Form.Control>
                        <Form.Label>Documento</Form.Label>
                        <Form.Control type="integer" placeholder="Documento" />
                        <Form.Label>Universidad</Form.Label>
                        <Form.Control as="select">
                            <option>Escuela Colombiana de Ingeniería Julio Garavito</option>

                        </Form.Control>
                        <Form.Label>Tipo de usuario</Form.Label>
                        <Form.Control name="tipo" as="select" onChange={this.myChangeHandler}>
                            <option>Pasajero</option>
                            <option>Conductor</option>
                        </Form.Control>
                        <Form.Label>Carné</Form.Label>
                        <Form.Control type="integer" placeholder="Carné" />
                    </Form.Group>
                    <Form.File id="carne" label="Adjuntar carné" />

                    
                    {this.state.tipoUsuario==="Pasajero" ? <Button className="btn btn-lg mt-5" variant="success" onClick={this.print}>Finalizar registro</Button> : 
                    <Button className="btn btn-lg mt-5" variant="warning" onClick={this.print}>Registrar vehiculo</Button>}


                </Form>
            </div>
        );
    }
}

export default FormUsuario;