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
                <p> Placa:{this.props.placa}</p>
                <p>Color: {this.props.color}</p>
                <p> Capacidad: {this.props.capacidad}</p>
            </CardContent>
        </Card>
      </Container>
    );
  }
} 