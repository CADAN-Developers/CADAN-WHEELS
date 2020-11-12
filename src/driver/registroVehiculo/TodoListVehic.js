import React from 'react';
import {Todo} from './Todo';

export class TodoListVehic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const vehicList = this.props.vehicList.map((vehic, i) => {
            console.log("HOLA "+vehic);
            return (
                <div >
                    <Todo key={i} marca={vehic.marca}  matricula={vehic.matricula} color={vehic.color} placa={vehic.placa} capacidad={vehic.capacidad} soat={vehic.soat}></Todo>
                </div>
                
            )
        });

        return (
            
            <div className="cardContainer">
                {vehicList}
            </div>

        );
    }
    
}