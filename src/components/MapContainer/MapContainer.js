import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';
import axios from 'axios'
import paw from './../../paw-solid.svg'

import CurrentLocation from './Map';

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        showInputMarker: false,
        showInputPosition: {},
        activeMarker: {},
        selectedPlace: {},
        marker: [],
        lat: '',
        lng: '',
        name: '',
        selectedMarkerId: ''
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    getMarkers = () => {
        axios.get('/api/markers').then(res => {
            console.log(res.data)
            this.setState({ marker: res.data })
        })
    }

    postMarkers = () => {
        console.log(this.state.lat, this.state.lng, this.state.name)
        axios.post('/api/markers', {
            lat: this.state.lat,
            lng: this.state.lng,
            name: this.state.name
        }).then(res => {
            console.log('put markers', res.data)
        }).catch(err => {
            console.log(err)
        })
        window.location.reload()
    }

    // deleteMarker = () => {
    //     axios.delete(`/api/markers/${id}`)
    // }

    componentDidMount(){
        this.getMarkers()
        console.log('component did mount')
    }

    addMarkerClick = async (mapProps, map, clickEvent) => {
        const lat = clickEvent.latLng.lat()
        const lng = clickEvent.latLng.lng()
        await this.setState({
            lat: lat,
            lng: lng,
            showInputMarker: true,
            showInputPosition: { lat, lng }
        })
        // console.log('click event lat', lat)
        // console.log('click event lng', lng)
    }

    openMarker = (props, marker) => {
        console.log('mark lat', marker.position.lat())
        console.log('mark lng', marker.position.lng())
        console.log('open marker')
        const lat = marker.latLng.lat()
        const lng = marker.latLng.lng()
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            showInputPosition: { lat, lng }
        })
    }

    handleChange = async e => {
        await this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.name)
    }

    toggle = () => {
        this.setState(state => ({
            createMarkerToggle: !state.createMarkerToggle
        }))
    }

    render() {
        let markers = this.state.marker.map((marker, i) => {
            return (
                <Marker
                    key={i}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={marker.name}
                    id={marker.id}
                    onClick={this.openMarker}
                    notInDb={false}
                // icon={{
                //     img: paw,
                //     anchor: new this.props.google.maps.Point(17, 38),
                //     scaledSize: new this.props.google.maps.Size(30, 35),
                //   }} 
                />
            )
        })
        let {
            showingInfoWindow,
            showInputMarker,
            showInputPosition,
            activeMarker,
            name,
        } = this.state

        let mapStyle = {
            width: '100%',
            height: '100%'
        }
        return (
            <main>
                <div className='inputBars' >
                    <input
                        type='text'
                        name='name'
                        value={name}
                        placeholder='Location Name'
                        onChange={this.handleChange} />
                </div>
                <div className='mapButtons' style={{background: 'purple', zIndex:5, marginBottom:10
            }}>
                    <button className='btn mapSave' onClick={this.postMarkers}>save</button>
                    <button type='button' className='btn mapDelete' onClick={this.deleteMarker}>delete</button>
                </div>
                <Map
                passive={true}
                    style={mapStyle}
                    centerAroundCurrentLocation
                    google={this.props.google}
                    onClick={this.addMarkerClick} >
                    <Marker
                        visible={showInputMarker}
                        position={showInputPosition}
                        onClick={this.openMarker}
                        notInDb={true}
                        animation={window.google.maps.Animation.BOUNCE}
                    // icon={{
                    //     img: paw,
                    //     anchor: new this.props.google.maps.Point(17, 38),
                    //     scaledSize: new this.props.google.maps.Size(30, 35),
                    // }}
                    />
                    {markers}
                    <InfoWindow
                        marker={activeMarker}
                        visible={showingInfoWindow}
                        onClose={this.onClose} >
                        {activeMarker.notInDb ?
                            <p>
                                <div>Add A Location Name</div>
                            </p>
                            :
                            <div>
                                <h5>
                                    {activeMarker.name}
                                </h5>
                            </div>
                        }
                    </InfoWindow>
                </Map>
            </main>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);