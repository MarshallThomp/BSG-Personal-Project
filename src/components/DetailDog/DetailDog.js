import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDog, updateDog } from './../../redux/reducers/dogs'
import { Link } from 'react-router-dom'
import axios from 'axios'

class DetailDog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dog: {
                dog_id: 0,
                name: '',
                breed: '',
                image: '',
                age: 0,
                vaccinated: '',
                fixed: '',
                description: '',
                user_id: 0,
                editing: false
            }
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params
        axios.get(`/api/dogs/${id}`).then(res => {
            this.setState({
                dog: res.data
            })
        })
    }

    handleInput = e => {
        this.setState({
            dog: {
                ...this.state.dog,
                [e.target.name]: e.target.value
            }
        })
    }

    handleAgeInput = e => {
        this.setState({
            dog: {
                ...this.state.dog,
                age: +e.target.value
            }
        })
    }

    update = e => {
        e.preventDefault();

        this.setState({
            editing: false
        })

        let updatedDog = this.state.dog
        this.props.updateDog(updatedDog)
        // this.props.getDog(id)
    }

    toggleEdit = () => {
        let { editing } = this.state
        editing ? this.setState({ editing: false }) : this.setState({ editing: true })
    }

    render() {
        console.log()
        const {
            name,
            breed,
            image,
            age,
            vaccinated,
            fixed,
            description
        } = this.state.dog
        return this.props.user.id === this.props.dog[0].user_id ? (this.state.editing ? (
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}>
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
                    <select
                    type='number'
                    placeholder='Dog Age'
                    name='age'
                    value={age}
                    onChange={this.handleAgeInput}
                    required>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                    </select>
                <label>Vaccinated: </label>
                <select
                    type='text'
                    placeholder='Vaccinated'
                    name='vaccinated'
                    value={vaccinated}
                    onChange={this.handleInput}
                    required >
                        <option>Vaccinated</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                <label>Fixed: </label>
                <select
                    type='text'
                    placeholder='fixed ?'
                    name='fixed'
                    value={fixed}
                    onChange={this.handleInput}
                    required>
                        <option>Fixed</option>
                        <option>Yes</option>
                        <option>NO</option>
                    </select>
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