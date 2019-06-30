import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDogs } from './../../redux/reducers/dogs'
import { Redirect, Link } from 'react-router-dom'
import Doglist from '../DogList/Doglist'
import axios from 'axios'

class Kennel extends Component {

    componentDidMount() {
        this.props.getDogs()
    }

    delete = id => {
        axios.delete(`/api/dogs/${id}`).then(res => {
            this.setState({
                dogs: res.data
            })
        })
    }

    render() {
        if (!this.props.user.id) {
            return <Redirect to="/welcomePage" />
        }
        return (
            <div>
                <h1>The Kennel</h1>
                <p>Have a new friend?<br />
                    <Link to="/addDog">
                        Welcome them here!
                    </Link>
                </p>
                <Doglist dogs={this.props.dogs} delete={this.delete} />
            </div>
        )
    }
}

let mapStateToProps = state => {
    let { dogs } = state.dogs
    let { data: user } = state.user
    return { dogs, user }
}
export default connect(mapStateToProps, { getDogs })(Kennel)