import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';
import Geocode from "react-geocode";
import Mapa  from './Mapa';

Geocode.setApiKey("AIzaSyDCq7iV7bIAnjv0MHr3nCxP5JTcphcnPlA");
Geocode.enableDebug();
class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latCenter: 4.7827,
            lngCenter: -74.0426,
            zoomLevel: 10
        }

    }
    render() {
        return (
            <div>
                <Mapa google={window.google} zoom={this.state.zoomLevel}
                    center={{ lat: this.state.latCenter, lng: this.state.lngCenter }}></Mapa>
            </div>
        )
    }



}

export default MapView