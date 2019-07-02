import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DetailDog from '../DetailDog/DetailDog'

class Dog extends Component {
    render() {
        const { id, user_id, name, image } = this.props.dog
        console.log(id)
        return this.props.user.id === user_id ? (
            <div>
                <h2>{name}</h2>
                <img src={image} alt="" />
                <Link to={`/detail/${id}`}>
                    <button>View Details</button>
                </Link>
                <button onClick={() => this.props.delete(id)}>Delete</button>
            </div>
        ) : (
                <div>
                    <h2>{name}</h2>
                    <img src={image} alt="" />
                    <Link to={`/detail/${id}`}>
                        <button>View Detials</button>
                    </Link>
                </div>
            )
    }
}

let mapStateToProps = state => {
    let { data: user} = state.user
    return { user }
}

export default connect(mapStateToProps)(withRouter(Dog))