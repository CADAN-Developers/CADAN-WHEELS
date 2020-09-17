import React from 'react';
import CardViajes from '../../components/CardViajes';
import Navigation from '../../components/Navigation';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export class RecordsPasajero extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items:[
            {"driver" : "https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg", 
            "name" : "JULIAN SANCHEZ", 
            "date" : "12-03-2020", 
            "map" : "/resources/primera.PNG", 
            "description" : "The trip was made in Cra 15 #45-12 to U. Andes", 
            "cost" : "10.000",
            "rating" : "3",
            "id" : "Viaje1"},
            {"driver" : "https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg", 
            "name" : "MARIA GONZALES", 
            "date" : "15-02-2020", 
            "map" : "/resources/segunda.PNG", 
            "description" : "The trip was made in Cra 100 #64-15 to U. Javeriana", 
            "cost" : "8.000",
            "rating" : "3",
            "id" : "Viaje2"},
            {"driver" : "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg", 
            "name" : "LAURA HERNANDEZ", 
            "date" : "17-01-2020", 
            "map" : "/resources/tercera.PNG", 
            "description" : "The trip was made in Cra 87 #54-02 to U. Piloto", 
            "cost" : "6.000",
            "rating" : "3",
            "id" : "Viaje3"}
        ]
        }
    }

    render() {
        const Viajes = this.state.items.map((todo, i) => {
            return (
                <CardViajes key={i} driver={todo.driver} name={todo.name} date={todo.date} map={todo.map} description={todo.description} cost={todo.cost} rating={todo.rating}/>
            );
        });

        return (
            <div>
                <Navigation tipoUsuario="Passenger" />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={3}>
                            {Viajes.map((value) => (
                                <Grid key={value} item>
                                    {value}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );


    }

}

export default RecordsPasajero;