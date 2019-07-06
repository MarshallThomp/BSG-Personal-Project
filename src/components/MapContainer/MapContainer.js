import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';
import axios from 'axios'
import paw from './../../assets/the-paw.png'

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
        description: '',
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
                showingInfoWindow: false
            });
        }
    };

    getMarkers = () => {
        axios.get('/api/markers').then(res => {
            this.setState({ marker: res.data })
        })
    }

    postMarkers = () => {
        axios.post('/api/markers', {
            lat: this.state.lat,
            lng: this.state.lng,
            name: this.state.name,
            description: this.state.description
        }).then(res => {
            console.log('put markers', res.data)
        }).catch(err => {
            console.log(err)
        })
        window.location.reload()
    }

    deleteMarker = () => {
        axios.delete(`/api/markers/delete?lat=${this.state.showInputPosition.lat}&lng=${this.state.showInputPosition.lng}`)
        .then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
        window.location.reload()
    }

    componentDidMount(){
        this.getMarkers()
        console.log('component did mount')
    }

    addMarkerClick = async (mapProps, map, clickEvent) => {
        console.log('hit')
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

    openMarker = async (props, marker) => {
        const lat = marker.position.lat()
        const lng = marker.position.lng()
        await this.setState({
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
                    description={marker.description}
                    id={marker.id}
                    onClick={this.openMarker}
                    notInDb={false}
                icon={{
                    url: paw,
                    anchor: new this.props.google.maps.Point(17, 38),
                    scaledSize: new this.props.google.maps.Size(30, 35),
                  }} 
                />
            )
        })
        let {
            showingInfoWindow,
            showInputMarker,
            showInputPosition,
            activeMarker,
            name,
            description
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
                        <input
                        type='text'
                        name='description'
                        value={description}
                        placeholder='Description'
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
                        icon={{
                            url: paw,
                            anchor: new this.props.google.maps.Point(17, 38),
                            scaledSize: new this.props.google.maps.Size(30, 35),
                          }}
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
                                    {activeMarker.title}
                                </h5>
                                <h5>{activeMarker.description}</h5>
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