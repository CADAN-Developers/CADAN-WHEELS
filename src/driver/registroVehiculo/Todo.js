import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Container } from '@material-ui/core';

export class Todo extends React.Component{
  render(){
    return (
      <Container component="main" maxWidth="sm" fixed= "true">
        <Card style={{marginTop: "10px"}}>
            <CardContent>
                <p> Marca: {this.props.marca}</p>
                <p> Fecha de matricula: {this.props.matricula.format('DD-MM-YYYY')}</p>
                <p> Placa:{this.props.placa}</p>
                <p> Capacidad: {this.props.capacidad}</p>
                <p>Fecha de expedicion soat: {this.props.soat.format('DD-MM-YYYY')}</p>
            </CardContent>
        </Card>
      </Container>
    );
  }
} 