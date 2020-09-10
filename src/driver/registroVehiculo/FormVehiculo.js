import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import moment from "moment";


export default class FormVehiculo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {vehiculos:[],marca:'',año:'',placa:'',capacidad:'',soat:moment()};
        
    }

    render() {
        return (
            <div>
                <Form className="registro-vehiculo">
                    <Form.Group controlId="Marca">
                        <Form.Label>Seleccione la marca de su vehículo: </Form.Label>
                        <Form.Control as="select">
                            <option>Renault</option>
                            <option>Mazda</option>
                            <option>Chevrolet</option>
                            <option>Nissan</option>
                            <option>Ford</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Modelo">
                        <Form.Label>Seleccione el año de su vehículo: </Form.Label>
                        <Form.Control as="select">
                            <option>2000</option>
                            <option>2001</option>
                            <option>2002</option>
                            <option>2003</option>
                            <option>2004</option>
                            <option>2005</option>
                            <option>2006</option>
                            <option>2007</option>
                            <option>2008</option>
                            <option>2009</option>
                            <option>2010</option>
                            <option>2011</option>
                            <option>2012</option>
                            <option>2013</option>
                            <option>2014</option>
                            <option>2015</option>
                            <option>2016</option>
                            <option>2017</option>
                            <option>2018</option>
                            <option>2019</option>
                            <option>2020</option>
                            <option>2021</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Placa">
                        <Form.Label>Placa de su vehículo</Form.Label>
                        <Form.Control type="text" placeholder="AAA123" />
                    </Form.Group>
                    <Form.Group controlId="Puestos">
                        <Form.Label>Seleccione la capacidad de puestos en su vehículo: </Form.Label>
                        <Form.Control as="select">
                            <option>2</option>
                            <option>5</option>
                            <option>7</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Soat">
                        <Form.Label>Seleccione la fecha de expedición del SOAT: </Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group>
                        <Form.File id="SoatArchivo" label="Suba una foto del soat: " />
                    </Form.Group>
                    <Button variant="outline-primary" type="submit" size="lg" block>
                        ¡Registrar Vehículo {this.state.vehiculos.length +1}!
                    </Button>
                </Form>
            </div>
        );

    }

    

}