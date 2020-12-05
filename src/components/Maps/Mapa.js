/*global google*/
import React from 'react';
import {
    withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker,
    DirectionsRenderer,Polyline } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import Navigation from '../../components/Navigation'
import decodePolyline from "decode-google-map-polyline"
import Button from '@material-ui/core/Button';
import axios from "axios";
import moment from 'moment'
import TextField from '@material-ui/core/TextField';
//const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

// config
import { API_ROOT } from '../../config/api-config';


Geocode.setApiKey("AIzaSyDCq7iV7bIAnjv0MHr3nCxP5JTcphcnPlA");
Geocode.enableDebug();
let originI = new google.maps.LatLng(4.7827, -74.0426);
let destinationI = new google.maps.LatLng(4.740983, -74.035435)
/*let originI = { lat: 4.7827, lng: -74.0426 };
let destinationI = { lat: 4.740983, lng: -74.035435};*/

class Mapa extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            directions: new Array(originI, destinationI),
            address: '',
            city: '',
            area: '',
            state: '',
            zoom: 15,
            height: 400,
            mapPosition: {
                lat: 4.7827,
                lng: -74.0426,
            },
            markerPosition: {
                lat: 4.7827,
                lng: -74.0426,
            },
            origen: { lat: 4.7827, lng: -74.0426 },
            destino: { lat: 4.740983, lng: -74.035435 }
        }
        this.handlePublish = this.handlePublish.bind(this)
    }
    

    async componentDidMount() {
        console.log(sessionStorage.getItem("usuarioCompleto"))
        const directionsService = new window.google.maps.DirectionsService();

      /*const originP = new google.maps.LatLng(4.7827, -74.0426);
        const destinationP = new google.maps.LatLng(4.740983, -74.035435)*/
        const originP = this.state.origen;
        const destinationP = this.state.destino;
       await directionsService.route(
            {
                origin: originP,
                destination: destinationP,
                travelMode: google.maps.TravelMode.DRIVING
            },
            
            (result, status) => {
                
                if (status === window.google.maps.DirectionsStatus.OK) {
                    console.log(result)
                    this.setState({
                        directions: result.routes[0].overview_path,
                        zoom:this.state.zoom - 2
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }

        );

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markerPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                },
                    () => {
                        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                            response => {
                                console.log(response)
                                const address = response.results[0].formatted_address,
                                    addressArray = response.results[0].address_components,
                                    city = this.getCity(addressArray),
                                    area = this.getArea(addressArray),
                                    state = this.getState(addressArray);
                                console.log('city', city, area, state);
                                this.setState({
                                    address: (address) ? address : '',
                                    area: (area) ? area : '',
                                    city: (city) ? city : '',
                                    state: (state) ? state : '',
                                })
                            },
                            error => {
                                console.error(error);
                            }
                        );
                    })

            });
        } else {
            console.error("El navegador no tiene geolocalización!");
        }
    };

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };


    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    onPlaceOriginSelected = (place) => {
        console.log('plc', place);
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        console.log('latvalue', latValue)
        console.log('lngValue', lngValue)


        this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
            origen: {
                lat: latValue,
                lng: lngValue
            },
        })
        this.componentDidMount()
    };

    onPlaceDestinySelected = (place) => {
        console.log('plc', place);
        const address = place.formatted_address,
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        console.log('latvalue', latValue)
        console.log('lngValue', lngValue)


        this.setState({
       
            destino: {
                lat: latValue,
                lng: lngValue
            },
        })
        this.componentDidMount()
    };

    async handlePublish() {
        console.log("Preparacion de boton para el back")
        const vehiculo = {
            placa: "MCX 123"
        }
        var user = sessionStorage.getItem("usuarioCompleto")

        //console.log(user.nombre)
        user = JSON.parse(user)
        console.log(user)
        const listItem = []
        this.state.directions.map((point, i) => {
            //console.log("latiutde: " + point.lat() + "longitud " + point.lng())
            listItem.push(JSON.stringify({ "lat": point.lat(), "lng": point.lng() }))
        })
        const valor = this.state.directions.length < 300 ? 3000 : this.state.directions.length * 100
        const newMapa = {
            origen: JSON.stringify(this.state.origen),
            destino: JSON.stringify(this.state.destino),
            ruta: listItem,
            costo: valor
        }
        const newViaje = {
            idViaje: 1234,
            pasajero:"",
            conductor: user.correo,
            ruta: "CC HAYUELOS  A Escuela Colombiana de Ingenieria",
            costo: valor,
            calificacion: 0,
            tipoViaje: "OFRECIDO",
            fecha: moment(),
            cupos: 3,
            mapa: newMapa,
            vehiculo: vehiculo,
        }

        await axios.post(API_ROOT + '/AddViaje', {
            idViaje: 1234,
            pasajero: "",
            conductor: "nicolas@mail.com",
            ruta: "CC HAYUELOS  A Escuela Colombiana de Ingenieria",
            costo: valor,
            calificacion: 0,
            tipoViaje: "OFRECIDO",
            fecha: moment(),
            cupos: 3,
            mapa: newMapa,

        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(newViaje);

        console.log(newMapa)
        
    }
    
    render() {
        const listItems = []
        var destino = {
            "lat":this.state.directions[1].lat, "lng" :this.state.directions[1].lng}
      //  this.state.directions.map((point, index) => {
      //      console.log(point)
      //      listItems.push(point.lat.toString)
      //  }
      //  );
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                 

                    <GoogleMap defaultZoom={this.state.zoom} defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}>
                        {this.state.directions.map((point, i) => {
                            //console.log("latiutde: " + point.lat() + "longitud " + point.lng())
                            listItems.push({ "lat": point.lat(), "lng": point.lng() }) 
                            if (i === this.state.directions.length-1){
                                destino = { "lat": point.lat(), "lng": point.lng() };
                            }
                            
                       })
                        }
                        {console.log(listItems)}
                           <label>
                        destino :
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '2rem'
                            }}
                            onPlaceSelected={this.onPlaceDestinySelected}
                            types={['establishment']}
                            componentRestrictions={{ country: "co" }}
                        />
                    </label> 
                        <Polyline
                            path={listItems}
                            strokeColor="#7F0000" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeColors={[
                                '#7F0000',
                                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                                '#B24112',
                                '#E5845C',
                                '#238C23',
                                '#7F0000'
                            ]}
                            strokeWidth={6}
                        />

                        {/* init marker point*/}
                        <Marker
                            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                            icon={"http://maps.google.com/mapfiles/ms/micons/yellow-dot.png"}
                        />

                        {/* end marker point*/}

                        <Marker
                            position={{ lat: destino.lat, lng: destino.lng }}
                            icon={"http://maps.google.com/mapfiles/ms/micons/rangerstation.png"} 
                       />

                        {/*  <DirectionsRenderer directions={this.state.directions} /> */}

                        {/* as   <Marker
                            google={this.props.google}
                            name={'Dolores park'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        />
                        <InfoWindow onClose={this.onInfoWindowClose} position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}>
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                            </div>
                        </InfoWindow>
                        <Marker /> */}

                        <label>
                            origen :
                        <Autocomplete
                                style={{
                                    width: '100%',
                                    height: '40px',
                                    paddingLeft: '16px',
                                    marginTop: '2px',
                                    marginBottom: '2rem'
                                }}
                                onPlaceSelected={this.onPlaceOriginSelected}
                                types={['establishment']}
                                componentRestrictions={{ country: "co" }}
                            />
                        </label>
                        <hr />
                        <Button variant="contained" color="primary" onClick={this.handlePublish}>
                            publish route
                </Button>
                    </GoogleMap>
                )
            )
        );

        var user = sessionStorage.getItem("usuarioCompleto")

        //console.log(user.nombre)
        user = JSON.parse(user)
        return (
            <div>
                <label>
                    informacion Vehiculo
                <TextField id="placa" label="placa" value="mcx 123" />
                </label>

                <label>
                    informacion conductor
                    <TextField id="nombre" label="nombre del conductor" value={user.nombre} />
                    <TextField id="apellido" label="Apellido" value={user.nombre} />
                </label>

  
                <div>
                    < Navigation tipoUsuario="Passenger" />
                    <div style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }} >
                        <div className="form-group">
                            <label htmlFor="">Ciudad</label>
                            <input type="text" name="city" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.city} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Area</label>
                            <input type="text" name="area" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.area} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Estado</label>
                            <input type="text" name="state" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.state} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Dirección</label>
                            <input type="text" name="address" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.address} />
                        </div>
                    </div>
                    <div style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>
                        <AsyncMap
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCq7iV7bIAnjv0MHr3nCxP5JTcphcnPlA&libraries=places"
                            loadingElement={
                                <div style={{ height: `100%` }} />
                            }
                            containerElement={
                                <div style={{ height: this.state.height }} />
                            }
                            mapElement={
                                <div style={{ height: `100%` }} />
                            }
                        />
                    </div>
               
                </div>
           
            </div>
        )
    }

}

export default Mapa;
