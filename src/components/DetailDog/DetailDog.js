import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDog, updateDog } from './../../redux/reducers/dogs'
import { Link } from 'react-router-dom'

class DetailDog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dog: {
                id: 0,
                name: '',
                breed: '',
                image: '',
                age: 0,
                vaccinated: '',
                fixed: '0',
                description: '',
                editing: false
            }
        }
    }

    componentDidMount() {
        // this.props.getDog()
        this.setState({
            dog: this.props.dog[0]
        })
    }

    componentDidUpdate(prevState) {
        if(prevState !== this.state) {
            
        }
    }

    handleInput = e => {
        this.setState({
            dog: {
                ...this.props.dog,
                [e.target.name]: e.target.value
            }
        })
    }

    handleAgeInput = e => {
        this.setState({
            dog: {
                ...this.props.dog,
                age: +e.target.value
            }
        })
    }

    update = e => {
        e.preventDefault();

        const {
            name,
            breed,
            image,
            age,
            vaccinated,
            fixed,
            description } = this.state.dog

        this.setState({
            name,
            breed,
            image,
            age,
            vaccinated,
            fixed,
            description,
            editing: false
        })

        let updatedDog = this.state
        console.log(updatedDog)
        this.props.updateDog({...this.props.dog[0], ...updatedDog.dog})
    }

    toggleEdit = () => {
        let { editing } = this.state
        editing ? this.setState({ editing: false }) : this.setState({ editing: true })
    }

    render() {
        const {
            name,
            breed,
            image,
            age,
            vaccinated,
            fixed,
            description
        } = this.state.dog
        // console.log(this.state)
        return this.props.user.id === this.props.dog.user_id ? (this.state.editing ? (
            <div>
                <form 
                onSubmit={this.update}>
                    <label>Name</label>
                    <input
                    type='text'
                    placeholder='Dog Name'
                    name='name'
                    value={name}
                    onChange={this.handleInput}
                    required />
                    <label>Breed</label>
                    <input
                    type='text'
                    placeholder='Dog Breed'
                    name='breed'
                    value={breed}
                    onChange={this.handleInput}
                    required />
                    <label>Age</label>
                    <input
                    type='number'
                    placeholder='Dog Age'
                    name='age'
                    value={age}
                    onChange={this.handleAgeInput}
                    required />
                    <label>Vaccinated?</label>
                    <input
                    type='text'
                    placeholder='Vaccinated'
                    name='vaccinated'
                    value={vaccinated}
                    onChange={this.handleInput}
                    required />
                    <label>Fixed?</label>
                    <input
                    type='text'
                    placeholder='fixed ?'
                    name='fixed'
                    value={fixed}
                    onChange={this.handleInput}
                    required />
                    <label>Description</label>
                    <input
                    type='text'
                    placeholder='description'
                    name='description'
                    value={description}
                    onChange={this.handleInput}
                    required />
                    <label>image</label>
                    <input
                    type='text'
                    placeholder='Dog Image'
                    name='image'
                    value={image}
                    onChange={this.handleInput}
                    required />
                </form>
                <button onClick={this.update}>Save</button>
                <button onClick={this.toggleEdit}>Cancel</button>
            </div>
        ) : (
            <div>
                <div>
                    <h1>{name}</h1>
                    <h3>Breed: {breed}</h3>
                    <h3>Age: {age}</h3>
                    <h3>vaccinated: {vaccinated}</h3>
                    <h3>Fixed: {fixed}</h3>
                    <h3>Description: {description}</h3>
                </div>
                <div>
                    <img src={image} alt="" />
                </div>
                <button onClick={this.toggleEdit}>Update</button>
                <Link to="/kennel">
                    <button>Return</button>
                </Link>
            </div>

        )) : (
            <div>
                <div>
                    <h1>{name}</h1>
                    <h3>Breed: {breed}</h3>
                    <h3>Age: {age}</h3>
                    <h3>vaccinated: {vaccinated}</h3>
                    <h3>Fixed: {fixed}</h3>
                    <h3>Description: {description}</h3>
                </div>
                <div>
                    <img src={image} alt="" />
                </div>
                <Link to="/kennel">
                    <button>Return</button>
                </Link>
            </div>
        )
    }
}

let mapStateToProps = state => {
    let { dogs: dog } = state.dogs
    let { data: user} = state.user
    return { dog, user }
}

export default connect(mapStateToProps, { updateDog, getDog })(DetailDog)