import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import Navigation from '../../components/Navigation'

//const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


Geocode.setApiKey("AIzaSyDCq7iV7bIAnjv0MHr3nCxP5JTcphcnPlA");
Geocode.enableDebug();

class Mapa extends React.Component {

  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 4.7827,
      lng: -74.0426,
    }
  }

  componentDidMount() {
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

  onPlaceSelected = (place) => {
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
    })
  };


  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap defaultZoom={this.state.zoom} defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}>

            <Marker
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
            <Marker />

            <Autocomplete
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '2rem'
              }}
              onPlaceSelected={this.onPlaceSelected}
              types={['establishment']}
              componentRestrictions={{ country: "co" }}
            />
          </GoogleMap>
        )
      )
    );

    return (
      <div>
        < Navigation tipoUsuario="Passenger" />
        <div style={{padding: '1rem', margin: '0 auto', maxWidth: 1000}} >
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
        <div style={{padding: '1rem', margin: '0 auto', maxWidth: 1000}}> 
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
    )
  }

}

export default Mapa;
