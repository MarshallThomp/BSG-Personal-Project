import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './Dog.css'

class Dog extends Component {
    render() {
        const { id, user_id, name, image } = this.props.dog
        return this.props.user.id === user_id ? (
            <div className='dogView'>
                <div className='dogInfo'>
                    <h2 className='dogViewName'>{name}</h2>
                    <img className='dogViewPic' src={image} alt="" />
                </div>
                <div className='dogBtn'>
                    <Link to={`/detail/${id}`}>
                        <button className='btn detailView'>View Details</button>
                    </Link>
                    <button className='btn deleteDog' onClick={() => this.props.delete(id)}>Delete</button>
                </div>
            </div>
        ) : (
                <div className='dogView'>
                    <div className='dogInfo'>
                        <h2 className='dogViewName'>{name}</h2>
                        <img className='dogViewPic' src={image} alt="" />
                    </div>
                    <div className='dogBtn'>
                        <Link to={`/detail/${id}`}>
                            <button className='btn detailView'>View Detials</button>
                        </Link>
                    </div>
                </div>
            )
    }
}

let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps)(withRouter(Dog))