import React from 'react';
import WebSocket from "./WebSocket";

// Retorna la url del servicio. Es una función de configuración.
function BBServiceURL() {
    //var host = window.location.host;
    var host = "localhost:8080"
    //var viaje = sessionStorage.getItem("idViaje");
    var viaje = 1;
    var url = 'wss://' + (host) + '/apiChat/' + viaje;
    console.log("URL Calculada: " + url);
    return url;
}


class ChatTrip extends React.Component {
    constructor(props) {
        super(props);

        this.comunicationWS =
            new WebSocket(BBServiceURL(),
                (msg) => {
                    var obj = JSON.parse(msg);
                    //          console.log("On func call back ", msg);
                    this.sendMessage(obj);
                });
        this.state = {
            idSala: 1,
            mensaje: "",
            mensajesR: [],
            mensajesS: []

        };

        this.publish = this.publish.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    sendMessage(estado) {


        //        this.state.mensajesR.push(msg);
        //        this.state.mensajesS.push(null);
        //  console.log("--------Nuevo Estado----"+ estado);
        this.setState(estado);
        this.setState(
            [this.state.mensajesR, this.state.mensajesS] = [this.state.mensajesS, this.state.mensajesR]
        );

        //console.log(this.state);

    }

    publish() {

        this.state.mensajesS.push(this.state.mensaje);
        this.state.mensajesR.push(null);
        this.comunicationWS.send(JSON.stringify(this.state));
        this.setState({ mensaje: "" });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }


  

    render() {
        let listMensajeR = this.state.mensajesR;
        let listMensajeS = this.state.mensajesS;
        return (
                <div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" name="mensaje" placeholder="Enviar Mensaje ... " onChange={this.handleChange} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.publish}> Send </button>
                            </div>
                            <hr />
                        </div>
                   
                    <div className="row">
                        <div className="col-md-6">
                            <ul className="list-group">RECIBIDOS:
                                    {listMensajeR.map((cadena, index) => (
                                <li key={index} className="list-group-item active"> {cadena} </li>
                            ))}
                            </ul>
                        </div>

                        <div className="col-md-6">

                            <ul>ENVIADOS:
                                    {listMensajeS.map((cadena, index) => (
                                <li key={index} className="list-group-item"> {cadena} </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>

        );
    }

}
export default ChatTrip;