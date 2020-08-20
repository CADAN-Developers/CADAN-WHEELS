import React from 'react';
import Form from 'react-bootstrap/Form';

class FormUsuario extends React.Component {
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
                        <Form.Control as="select">
                            <option>Conductor</option>
                            <option>Pasajero</option>
                            
                        </Form.Control>
                        <Form.Label>Carné</Form.Label>
                        <Form.Control type="integer" placeholder="Carné" />
                    </Form.Group>
            
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Example multiple select</Form.Label>
                        <Form.Control as="select" multiple>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default FormUsuario;