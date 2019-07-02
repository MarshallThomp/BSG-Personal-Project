import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';


class MapContainer extends Component {
    constructor(props){
        super(props)

        this.state ={
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    onMapClicked = props => {
        if(this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
            >
                <Marker position={{ lat: 48.00, lng: -122.00 }} />
            </Map>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(MapContainer);

const mapStyles = {
    width: '100%',
    height: '100%',
};