import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../redux/reducers/users'

class Homepage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getUser()
    }

    render() {
        let { user } = this.props
        return (
            <div>
                {user ? <h1>Welcome, {user.first_name}</h1> : <Redirect to="/welcomePage" />}
            </div>
        )
    }
}

let mapStateToProp = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProp, { getUser })(Homepage)