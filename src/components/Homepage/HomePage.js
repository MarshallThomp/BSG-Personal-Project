import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/users'
import MapContainer from '../MapContainer/MapContainer'

class Homepage extends Component {
    componentDidMount() {
        this.props.getUser()
    }

    render() {
        let { user } = this.props
        return (
            <div>
                {user ? <h1>Welcome, {user.first_name}</h1> : <Redirect to="/welcomePage" />}
                <MapContainer />
            </div>
        )
    }
}

let mapStateToProp = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProp, { getUser })(Homepage)