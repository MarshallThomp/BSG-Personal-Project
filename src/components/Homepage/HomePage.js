import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/users'
import MapContainer from '../MapContainer/MapContainer'
import Header from './../../components/Header/Header'
import './Homepage.css'

class Homepage extends Component {
    componentDidMount() {
        this.props.getUser()
    }

    render() {
        let { user } = this.props
        return (
            <div>
                <Header />
                {user ? <p className='intro'>Puppy Play Dates Near You!<br /> or <br /> Make Your Own Mark!</p> : <Redirect to="/welcomePage" />}
                <div className='mapContainer'>
                    <MapContainer />
                </div>
            </div>
        )
    }
}

let mapStateToProp = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProp, { getUser })(Homepage)