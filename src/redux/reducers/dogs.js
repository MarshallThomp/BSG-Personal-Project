import axios from 'axios'

let initialState = {
    dogs: [],
    loading: false,
    selected: null
}

const GET_DOGS = 'GET_DOGS'
const GET_DOG = 'GET_DOG'
const GET_NEW_DOG = 'GET_NEW_DOG'
const UPDATE_DOG = 'UPDATE_DOG'
const UPDATE_ALL_DOGS = 'UPDATE_ALL_DOGS'

export default function (state = initialState, action) {
    let { type, payload } = action
    switch (type) {
        case GET_DOGS + '_PENDING':
            return { ...state, loading: true }
        case GET_DOGS + '_FULFILLED':
            return { ...state, loading: false, dogs: payload.data }
        case GET_DOG + '_PENDING':
            return { ...state, loading: true }
        case GET_DOG + '_FULFILLED':
            return { ...state, loading: false, dogs: payload.data }
        case GET_NEW_DOG + '_PENDING':
            return { ...state, loading: true }
        case GET_NEW_DOG + '_FULFILLED':
            return { ...state, loading: false, dogs: payload.data }
        case UPDATE_DOG + '_PENDING':
            return { ...state, loading: true }
        case UPDATE_DOG + '_FULFILLED':
            return { ...state, loading: false, dogs: payload.data }
        case UPDATE_ALL_DOGS + '_PENDING':
            return { ...state, loading: true }
        case UPDATE_ALL_DOGS + '_FULFILLED':
            return { ...state, loading: false, dogs: payload.data }
        default:
            return state
    }
}

export function getDogs() {
    return {
        type: GET_DOGS,
        payload: axios.get('/api/dogs')
    }
}

export function getDog(id) {
    return {
        type: GET_DOG,
        payload: axios.get(`/api/dogs/${id}`)
    }
}

export function getNewDog(newDog) {
    return {
        type: GET_DOG,
        payload: axios.get(`/api/dogs`, newDog)
    }
}

export function updateDog(updatedDog) {
    return {
        type: UPDATE_DOG,
        payload: axios.put(`/api/dogs`, updatedDog)
    }
}

export function updateAllDogs() {
    return {
        type: UPDATE_ALL_DOGS,
        payload: axios.get('/api/dogs')
    }
}